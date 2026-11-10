import type { Ogma } from "@linkurious/ogma";
import { defineComponent, markRaw, PropType, toRaw } from "vue";

/** Providers supported by the geo API of Ogma >= 6.1 (`@linkurious/ogma/geo`). */
export type GeoMapProvider = "mapbox" | "maplibre" | "deck" | "google";

/**
 * Options of `Geo` from `@linkurious/ogma/geo`, redeclared here so that this
 * package keeps compiling against older Ogma versions.
 */
export interface GeoOptions {
  latitudePath?: string;
  longitudePath?: string;
  getCoordinates?: (node: unknown) => { latitude: number; longitude: number } | null;
  projection?: {
    lngLatToWorld(coord: { latitude: number; longitude: number }): { x: number; y: number };
    worldToLngLat(point: { x: number; y: number }): { latitude: number; longitude: number };
  };
  syncCamera?: boolean;
  syncOnDrag?: boolean;
  hideNodesWithoutCoordinates?: boolean;
  reprojectOnViewChange?: boolean;
  sizeRatio?: number;
  minNodeSize?: number;
  animation?: number | { duration?: number; easing?: string };
  [key: string]: unknown;
}

/** The `Geo` instance of `@linkurious/ogma/geo`. */
export interface GeoBinding {
  enable(...args: unknown[]): Promise<void>;
  disable(...args: unknown[]): Promise<void>;
  enabled(): boolean;
  destroy(): void;
  setOptions(options: Record<string, unknown>): Promise<void>;
  on(event: GeoEvent, handler: () => void): void;
  off(event: GeoEvent, handler: () => void): void;
}

type GeoEvent = "enabled" | "disabled" | "cameraSync";
const geoEvents: GeoEvent[] = ["enabled", "disabled", "cameraSync"];

export interface GeoMapProps {
  /** Library the map was created with. */
  provider?: GeoMapProvider;
  /** The map instance, created and owned by the caller. Nothing is bound until it is defined. */
  map?: object;
  /** A ready-made adapter, used instead of `provider` + `map`. */
  adapter?: object;
  /** Whether geo mode is on. */
  enabled?: boolean;
  /** `GeoOptions`. */
  options?: GeoOptions;
}

type GeoModule = {
  Geo: new (ogma: unknown, adapter: unknown, options?: unknown) => GeoBinding;
  createMapboxAdapter(map: unknown): unknown;
  createMaplibreAdapter(map: unknown): unknown;
  createDeckAdapter(deck: unknown): unknown;
  createGoogleAdapter(map: unknown): unknown;
};

const factories = {
  mapbox: "createMapboxAdapter",
  maplibre: "createMaplibreAdapter",
  deck: "createDeckAdapter",
  google: "createGoogleAdapter",
} as const;

let geoModule: Promise<GeoModule> | undefined;
/** Loaded lazily, the entry point only exists in Ogma >= 6.1. */
function loadGeoModule(): Promise<GeoModule> {
  return (geoModule ??= (import("@linkurious/ogma/geo") as unknown as Promise<GeoModule>).catch(
    (e) => {
      geoModule = undefined;
      throw new Error(`[ogma-vue] GeoMap requires @linkurious/ogma >= 6.1 (${e?.message ?? e})`);
    },
  ));
}

/**
 * Binds a Mapbox GL / MapLibre GL / deck.gl / Google Maps instance to Ogma
 * (geo API of Ogma >= 6.1). The map is never destroyed by this component.
 */
export function useGeoMap<ND = unknown, ED = unknown>() {
  return defineComponent({
    inject: {
      ogma: {
        default: () => undefined as unknown as Ogma<ND, ED>,
      },
    },
    props: {
      provider: { type: String as PropType<GeoMapProvider>, required: false },
      map: { type: Object as PropType<object>, required: false, default: undefined },
      adapter: { type: Object as PropType<object>, required: false, default: undefined },
      enabled: { type: Boolean, default: false, required: false },
      options: {
        type: Object as PropType<GeoOptions>,
        required: false,
        default: () => ({}),
      },
    },
    emits: {
      ready(_geo: GeoBinding) {
        return true;
      },
      enabled() {
        return true;
      },
      disabled() {
        return true;
      },
      cameraSync() {
        return true;
      },
      error(_error: unknown) {
        return true;
      },
    },
    data() {
      // internal state: kept out of Vue's reactivity, map instances must never be proxied
      const state = markRaw({
        binding: null as GeoBinding | null,
        queue: Promise.resolve() as Promise<void>,
        generation: 0,
        handlers: {} as Partial<Record<GeoEvent, () => void>>,
      });
      return { state };
    },
    mounted() {
      this.$watch(
        () => [this.provider, this.map, this.adapter],
        () => this.rebuild(),
      );
      this.$watch(
        () => this.enabled,
        () => this.run(() => this.doSync()),
      );
      this.$watch(
        () => this.options,
        (options: GeoOptions) =>
          this.run(async () => {
            await this.state.binding?.setOptions({ ...toRaw(options) });
          }),
        { deep: true },
      );
      this.rebuild();
    },
    beforeUnmount() {
      this.state.generation++;
      this.state.queue = this.state.queue.then(() => {
        const { binding } = this.state;
        this.state.binding = null;
        if (binding) this.release(binding);
      });
    },
    methods: {
      /** The `Geo` instance of `@linkurious/ogma/geo`, `null` until a map is bound. */
      getGeo(): GeoBinding | null {
        return this.state.binding;
      },
      og(): Ogma<ND, ED> {
        return this.ogma as unknown as Ogma<ND, ED>;
      },
      /**
       * Serialise the async operations so enable/disable/rebuild never overlap,
       * a replacement binding is only created once the previous one is released.
       */
      run(task: () => Promise<void> | void) {
        const gen = this.state.generation;
        this.state.queue = this.state.queue
          .then(() => (gen === this.state.generation ? task() : undefined))
          .catch((error) => {
            this.$emit("error", error);
          });
        return this.state.queue;
      },
      rebuild() {
        this.state.generation++;
        return this.run(async () => {
          const previous = this.state.binding;
          this.state.binding = null;
          if (previous) this.release(previous);

          let adapter = this.adapter && toRaw(this.adapter);
          const map = this.map && toRaw(this.map);
          if (!adapter && !map) return; // nothing to bind yet
          const mod = await loadGeoModule();
          if (!adapter) {
            const factory = this.provider && factories[this.provider];
            if (!factory) {
              throw new Error(
                `[ogma-vue] GeoMap: "provider" must be one of ${Object.keys(factories).join(", ")}`,
              );
            }
            adapter = mod[factory](map) as object;
          }
          const binding = new mod.Geo(this.og(), adapter, { ...toRaw(this.options) });
          geoEvents.forEach((event) => {
            const handler = () => (this.$emit as (e: string) => void)(event);
            this.state.handlers[event] = handler;
            binding.on(event, handler);
          });
          this.state.binding = binding;
          this.$emit("ready", binding);
          await this.doSync();
        });
      },
      release(binding: GeoBinding) {
        geoEvents.forEach((event) => {
          const handler = this.state.handlers[event];
          if (handler) binding.off(event, handler);
        });
        this.state.handlers = {};
        binding.destroy();
      },
      async doSync() {
        const { binding } = this.state;
        if (!binding) return;
        if (this.enabled && !binding.enabled()) await binding.enable();
        else if (!this.enabled && binding.enabled()) await binding.disable();
      },
    },
    render() {
      return null;
    },
  });
}

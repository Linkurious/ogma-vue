import type { Ogma } from "@linkurious/ogma";
import { defineComponent, markRaw, PropType, toRaw } from "vue";

/**
 * Providers supported by the new geo API (`@linkurious/ogma/geo`, Ogma >= 6.1).
 */
export type GeoProviderType = "mapbox" | "maplibre" | "deck" | "google";

/**
 * Options of the new geo API. Mirrors `GeoOptions` from `@linkurious/ogma/geo`,
 * redeclared here so that this package keeps compiling against older Ogma versions.
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

/**
 * Options of the legacy (Leaflet based) `ogma.geo` API, `GeoModeOptions` in Ogma.
 * Used when neither `provider` nor `adapter` is given.
 */
export type LegacyGeoOptions = Record<string, unknown>;

/** Binding object created by `new Geo(ogma, adapter, options)` from `@linkurious/ogma/geo`. */
export interface GeoBinding {
  enable(...args: unknown[]): Promise<void>;
  disable(...args: unknown[]): Promise<void>;
  enabled(): boolean;
  destroy(): void;
  setOptions(options: Record<string, unknown>): Promise<void>;
  on(event: "enabled" | "disabled" | "cameraSync", handler: () => void): void;
  off(event: "enabled" | "disabled" | "cameraSync", handler: () => void): void;
}

export interface GeoProps {
  /** Whether geo mode is on. */
  enabled?: boolean;
  /** A Mapbox GL, MapLibre GL, deck.gl or Google Maps instance. Requires `providerType`. */
  provider?: object;
  /** Kind of `provider`. */
  providerType?: GeoProviderType;
  /** A ready-made adapter (`createMapboxAdapter(map)`, ...). Takes precedence over `provider`. */
  adapter?: object;
  /** `GeoOptions` in provider mode, legacy `GeoModeOptions` otherwise. */
  options?: GeoOptions | LegacyGeoOptions;
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
/** Loaded lazily so the legacy mode never touches the entry point (Ogma >= 6.1). */
function loadGeoModule(): Promise<GeoModule> {
  return (geoModule ??= (import("@linkurious/ogma/geo") as unknown as Promise<GeoModule>).catch(
    (e) => {
      geoModule = undefined;
      throw new Error(
        `[ogma-vue] Geo with a map provider requires @linkurious/ogma >= 6.1 (${e?.message ?? e})`,
      );
    },
  ));
}

export function useGeo<ND = unknown, ED = unknown>() {
  return defineComponent({
    inject: {
      ogma: {
        default: () => undefined as unknown as Ogma<ND, ED>,
      },
    },
    props: {
      enabled: { type: Boolean, default: true, required: false },
      provider: { type: Object as PropType<object>, required: false, default: undefined },
      providerType: { type: String as PropType<GeoProviderType>, required: false },
      adapter: { type: Object as PropType<object>, required: false, default: undefined },
      options: {
        type: Object as PropType<GeoOptions | LegacyGeoOptions>,
        required: false,
        default: () => ({}),
      },
    },
    emits: {
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
        handlers: {} as Record<string, () => void>,
      });
      return { state };
    },
    computed: {
      useProvider(): boolean {
        return !!(this.adapter || this.provider);
      },
    },
    mounted() {
      this.$watch(
        () => [this.provider, this.providerType, this.adapter],
        () => this.rebuild(),
      );
      this.$watch(
        () => this.enabled,
        () => this.sync(),
      );
      this.$watch(
        () => this.options,
        (options: Record<string, unknown>) => this.run(() => this.applyOptions(options)),
        { deep: true },
      );
      this.rebuild();
    },
    beforeUnmount() {
      this.state.generation++;
      const ogma = this.og();
      const { binding } = this.state;
      this.state.queue = this.state.queue.then(async () => {
        if (binding) {
          this.release(binding);
        } else if (!this.useProvider && ogma.geo.enabled()) {
          await ogma.geo.disable();
        }
      });
    },
    methods: {
      /** The `Geo` instance of `@linkurious/ogma/geo` (provider mode only). */
      getGeo(): GeoBinding | null {
        return this.state.binding;
      },
      og(): Ogma<ND, ED> {
        return this.ogma as unknown as Ogma<ND, ED>;
      },
      /** Serialise the async operations so enable/disable/rebuild never overlap. */
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
        const previous = this.state.binding;
        this.state.binding = null;
        return this.run(async () => {
          if (previous) this.release(previous);
          if (!this.useProvider) {
            // legacy ogma.geo API: nothing to build, `sync` toggles it
            return this.doSync();
          }
          // leaving the legacy mode for a provider
          if (this.og().geo.enabled()) await this.og().geo.disable();
          const mod = await loadGeoModule();
          let adapter = this.adapter && toRaw(this.adapter);
          if (!adapter) {
            const factory = this.providerType && factories[this.providerType];
            if (!factory) {
              throw new Error(
                `[ogma-vue] Geo: "providerType" must be one of ${Object.keys(factories).join(", ")} when "provider" is set`,
              );
            }
            adapter = mod[factory](toRaw(this.provider)) as object;
          }
          const binding = new mod.Geo(this.og(), adapter, { ...toRaw(this.options) });
          this.listen(binding);
          this.state.binding = binding;
          if (this.enabled) await binding.enable();
        });
      },
      listen(binding: GeoBinding) {
        (["enabled", "disabled", "cameraSync"] as const).forEach((event) => {
          const handler = () => (this.$emit as (e: string) => void)(event);
          this.state.handlers[event] = handler;
          binding.on(event, handler);
        });
      },
      release(binding: GeoBinding) {
        (["enabled", "disabled", "cameraSync"] as const).forEach((event) => {
          if (this.state.handlers[event]) binding.off(event, this.state.handlers[event]);
        });
        this.state.handlers = {};
        binding.destroy();
      },
      sync() {
        return this.run(() => this.doSync());
      },
      async doSync() {
        const { binding } = this.state;
        const ogma = this.og();
        if (this.useProvider) {
          if (!binding) return;
          if (this.enabled && !binding.enabled()) await binding.enable();
          else if (!this.enabled && binding.enabled()) await binding.disable();
        } else if (this.enabled && !ogma.geo.enabled()) {
          await ogma.geo.enable(this.options as never);
          this.$emit("enabled");
        } else if (!this.enabled && ogma.geo.enabled()) {
          await ogma.geo.disable();
          this.$emit("disabled");
        }
      },
      async applyOptions(options: Record<string, unknown>) {
        if (this.useProvider) {
          const { binding } = this.state;
          if (binding) await binding.setOptions({ ...toRaw(options) });
        } else {
          this.og().geo.setOptions(options as never);
        }
      },
    },
    render() {
      return null;
    },
  });
}

import type { Ogma } from "@linkurious/ogma";
import { defineComponent, PropType } from "vue";

/**
 * Options of the legacy (Leaflet based) `ogma.geo` API, `GeoModeOptions` in Ogma.
 */
export type LegacyGeoOptions = Record<string, unknown>;

export interface GeoProps {
  /** Whether geo mode is on. */
  enabled?: boolean;
  /** Legacy `GeoModeOptions`. */
  options?: LegacyGeoOptions;
}

/**
 * Legacy geo mode (`ogma.geo`, Leaflet). For Mapbox GL, MapLibre GL, deck.gl
 * or Google Maps use `GeoMap`.
 */
export function useGeo<ND = unknown, ED = unknown>() {
  return defineComponent({
    inject: {
      ogma: {
        default: () => undefined as unknown as Ogma<ND, ED>,
      },
    },
    props: {
      enabled: { type: Boolean, default: true, required: false },
      options: {
        type: Object as PropType<LegacyGeoOptions>,
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
      error(_error: unknown) {
        return true;
      },
    },
    data() {
      return { queue: Promise.resolve() as Promise<void> };
    },
    mounted() {
      this.$watch(
        () => this.enabled,
        () => this.sync(),
      );
      this.$watch(
        () => this.options,
        (options: LegacyGeoOptions) => this.og().geo.setOptions(options as never),
        { deep: true },
      );
      this.sync();
    },
    beforeUnmount() {
      this.queue = this.queue.then(async () => {
        const { geo } = this.og();
        if (geo.enabled()) await geo.disable();
      });
    },
    methods: {
      og(): Ogma<ND, ED> {
        return this.ogma as unknown as Ogma<ND, ED>;
      },
      /** Serialised so enable/disable calls never overlap. */
      sync() {
        this.queue = this.queue
          .then(async () => {
            const { geo } = this.og();
            if (this.enabled && !geo.enabled()) {
              await geo.enable(this.options as never);
              this.$emit("enabled");
            } else if (!this.enabled && geo.enabled()) {
              await geo.disable();
              this.$emit("disabled");
            }
          })
          .catch((error) => {
            this.$emit("error", error);
          });
        return this.queue;
      },
    },
    render() {
      return null;
    },
  });
}

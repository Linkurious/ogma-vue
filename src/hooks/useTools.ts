

import Ogma, {
  ConnectNodesOptions, LassoOptions,
  LegendOptions, RectangleSelectOptions,
  ResizingOptions, RewiringOptions
} from "@linkurious/ogma";
import { defineComponent, PropType } from "vue";

type ToolProps<T> = { enabled: boolean; options: T; };
export function useTools<O, ND = unknown, ED = unknown>(name: string) {
  return defineComponent({
    inject: {
      ogma: {
        default: () => undefined as unknown as Ogma<ND, ED>
      },
    },
    props: {
      enabled: {
        type: Boolean,
        default: true,
        required: false
      },
      options: {
        type: Object as PropType<O>,
        default: () => ({}),
        required: false
      },
    },
    mounted() {
      if (this.enabled) {
        this.enable();
      }
      this.$watch(() => [this.enabled, this.options], ([isEnabled], [wasEnabled]) => {
        if (wasEnabled) {
          this.disable();
        }
        if (isEnabled) {
          this.enable();
        }
      });
    },
    beforeUnmount() {
      this.disable();
    },
    methods: {
      enable() {
        const { options } = this;
        this.ogma.tools[name].enable(options);
      },
      disable() {
        this.ogma.tools[name].disable();
      },
    },
    render() {
      return null;
    }
  });
}

export function useSnapping() {
  return useTools("snapping");
}
export type ConnectNodeProps<ND = unknown, ED = unknown> = ToolProps<ConnectNodesOptions<ND, ED>>;
export function useConnectNodes<ND = unknown, ED = unknown>() {
  return useTools<ConnectNodesOptions<ND, ED>, ND, ED>("connectNodes");
}
export type LassoProps<ND = unknown, ED = unknown> = ToolProps<LassoOptions<ND, ED>>;
export function useLasso<ND = unknown, ED = unknown>() {
  return useTools<LassoOptions<ND, ED>, ND, ED>("lasso");
}
export type LegendProps = ToolProps<LegendOptions>;
export function useLegend() {
  return useTools<LegendOptions>("legend");
}
export type RectangleSelectProps = ToolProps<RectangleSelectOptions>;
export function useRectangleSelect() {
  return useTools<RectangleSelectOptions>("rectangleSelect");
}
export type ResizeProps = ToolProps<ResizingOptions>;
export function useResize() {
  return useTools<ResizingOptions>("resize");
}
export type RewireProps = ToolProps<RewiringOptions>;
export function useRewire() {
  return useTools<RewiringOptions>("rewire");
}
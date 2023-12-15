

import Ogma, { ConnectNodesOptions, LassoOptions, LegendOptions, RectangleSelectOptions, ResizingOptions, RewiringOptions } from "@linkurious/ogma";
import { defineComponent, PropType } from "vue";

export function useTools<O, ND = unknown, ED = unknown>(name: string) {
  return defineComponent({
    inject: {
      ogma: {
        default: () => new Ogma() as unknown as Ogma<ND, ED>
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
    methods: {
      enable() {
        const { options } = this;
        this.ogma.tools.enable[name].enable(options);
      },
      disable() {
        this.ogma.tools.enable[name].disable();
      },
    },
    onMounted() {
      if (this.enabled) {
        this.enable();
      }
      this.$watch(['enabled', 'options'], ([isEnabled], [wasEnabled]) => {
        if (wasEnabled) {
          this.disable();
        }
        if (isEnabled) {
          this.enable();
        }
      });
    },
    onBeforeUnmount() {
      this.disable();
    }
  });
}

export function useSnapping() {
  return useTools("snapping");
}
export function useConnectNodes<ND = unknown, ED = unknown>() {
  return useTools<ConnectNodesOptions<ND, ED>, ND, ED>("connectNodes");
}
export function useLasso<ND = unknown, ED = unknown>() {
  return useTools<LassoOptions<ND, ED>, ND, ED>("lasso");
}
export function useLegend() {
  return useTools<LegendOptions>("legend");
}
export function useRectangleSelect() {
  return useTools<RectangleSelectOptions>("rectangleSelect");
}
export function useResize() {
  return useTools<ResizingOptions>("resize");
}
export function useRewire() {
  return useTools<RewiringOptions>("rewire");
}
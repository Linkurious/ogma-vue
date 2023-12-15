/* eslint-disable @typescript-eslint/no-unused-vars */
import Ogma, {
  EdgeGrouping, EdgeGroupingOptions, NodeFilterOptions,
  NodeGrouping, NodeFilter, NodeGroupingOptions,
  Transformation, EdgeFilterOptions, EdgeFilter,
  NeighborGenerationOptions, NeighborGeneration,
  GeoClusteringOptions, GeoClustering, NeighborMergingOptions,
  NeighborMerging, NodeCollapsingOptions, NodeCollapsing, VirtualPropertiesOptions, VirtualProperties,
  // NodeClusteringOptions, NodeClustering,
} from "@linkurious/ogma";
import { defineComponent, PropType } from "vue";

export type Events =
  | "all"
  | {
    enabled?: boolean;
    disabled?: boolean;
    refreshed?: boolean;
    indexChanged?: boolean;
    destroyed?: boolean;
  };
export type BaseOptions = {
  duration?: number;
  enabled?: boolean;
};
export type PropOptions<O> = Omit<O, keyof BaseOptions>;
export type PropsTransformations<O> = BaseOptions & {
  events?: Events;
  index?: number;
  options?: PropOptions<O>;
};

export type EmitType<T> = {
  (e: "enabled", transformation: T): void;
  (e: "disabled", transformation: T): void;
  (e: "refreshed", transformation: T): void;
  (e: "indexChanged", transformation: T, index: number): void;
  (e: "destroyed", transformation: T): void;
};
function useTransformations<O extends BaseOptions, T extends Transformation<ND, ED, O>, ND = unknown, ED = unknown>(
  create: string,
) {

  let transformation: T;
  const listenners: ((a: unknown) => unknown)[] = [];
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
      duration: {
        type: Number,
        default: 0,
        required: false
      },
      index: {
        type: Number,
        default: 0,
        required: false
      },
      options: {
        type: Object as PropType<O>,
        default: () => ({}),
        required: false
      },
      events: {
        type: [Object, String] as PropType<Events>,
        default: "all",
        required: false
      },
    },
    emits: {
      enabled: (_transformation: T) => true,
      disabled: (_transformation: T) => true,
      refreshed: (_transformation: T) => true,
      indexChanged: (_transformation: T, _index: number) => true,
      destroyed: (_transformation: T) => true,
    },
    watch: {
      enabled(curr, old) {
        const shouldEnable = curr.enabled && !old.enabled;
        const shouldDisable = !curr.enabled && old.enabled;
        const t = transformation;
        if (shouldEnable) {
          t.enable(curr.duration || 0);
        }
        if (shouldDisable) {
          t.disable(curr.duration || 0);
        }
      },
      options(curr) {
        if (!transformation) return;
        transformation.setOptions(curr);
      },
      index(curr) {
        if (!transformation) return;
        transformation.setIndex(curr);
      },
      events(curr) {
        this.unRegisterEvents();
        this.registerEvents(curr || "all");
      }
    },
    methods: {
      createTranformation() {
        const { options, enabled, duration, index } = this;
        // @ts-ignore
        transformation = this.ogma.transformations[create]({
          ...(options || {}),
          enabled,
          duration,
        });
        if (index !== undefined) {
          transformation.setIndex(index);
        }
        return transformation;
      },
      registerEvents(events: Events) {
        if (!this.ogma || !transformation) return;
        const validEvents = {
          enabled: "transformationEnabled",
          disabled: "transformationDisabled",
          refreshed: "transformationRefresh",
          indexChanged: "transformationSetIndex",
          destroyed: "transformationDestroyed",
        };
        Object.keys(events === "all" ? validEvents : events).forEach((event) => {
          // @ts-ignore
          const ogmaEvent = validEvents[event];
          if (!ogmaEvent) return;
          // @ts-ignore
          const listenner = ({ target, index }) => {
            if (target !== transformation) return;
            // @ts-ignore
            this.$emit(event, transformation, index);
          };
          // @ts-ignore
          listenners.push(listenner);
          this.ogma.events.on(ogmaEvent, listenner);
        });
      },
      unRegisterEvents() {
        if (!this.ogma) return;
        listenners.forEach((listenner) => {
          this.ogma.events.off(listenner);
        });
      }
    },
    onMounted() {
      this.createTranformation();
      this.registerEvents(this.events || "all");
    },
    onBeforeUnmount() {
      this.unRegisterEvents();
      if (!transformation) return;
      transformation.destroy();
    },
    render() {
      return null;
    }
  });
}

export type NodeGroupingProps<ND = unknown, ED = unknown> = PropsTransformations<NodeGroupingOptions<ND, ED>>;
export function useNodeGrouping<ND = unknown, ED = unknown>() {
  return useTransformations<NodeGroupingOptions<ND, ED>, NodeGrouping<ND, ED>, ND, ED>('addNodeGrouping');
}
export type EdgeGroupingProps<ND = unknown, ED = unknown> = PropsTransformations<EdgeGroupingOptions<ND, ED>>;
export function useEdgeGrouping<ND = unknown, ED = unknown>() {
  return useTransformations<EdgeGroupingOptions<ND, ED>, EdgeGrouping<ND, ED>, ND, ED>('addEdgeGrouping');
}
export type NodeFilterProps<ND = unknown, ED = unknown> = PropsTransformations<NodeFilterOptions<ND, ED>>;
export function useNodeFilter<ND = unknown, ED = unknown>() {
  return useTransformations<NodeFilterOptions<ND, ED>, NodeFilter<ND, ED>, ND, ED>('addNodeFilter');
}
export type EdgeFilterProps<ND = unknown, ED = unknown> = PropsTransformations<EdgeFilterOptions<ND, ED>>;
export function useEdgeFilter<ND = unknown, ED = unknown>() {
  return useTransformations<EdgeFilterOptions<ND, ED>, EdgeFilter<ND, ED>, ND, ED>('addEdgeFilter');
}
export type NeighborGenerationProps<ND = unknown, ED = unknown> = PropsTransformations<NeighborGenerationOptions<ND, ED>>;
export function useNeighborGeneration<ND = unknown, ED = unknown>() {
  return useTransformations<NeighborGenerationOptions<ND, ED>, NeighborGeneration<ND, ED>, ND, ED>('addNeighborGeneration');
}
export type GeoClusteringProps<ND = unknown, ED = unknown> = PropsTransformations<GeoClusteringOptions<ND, ED>>;
export function useGeoClustering<ND = unknown, ED = unknown>() {
  return useTransformations<GeoClusteringOptions<ND, ED>, GeoClustering<ND, ED>, ND, ED>('addGeoClustering');
}
export type NeighborMergingProps<ND = unknown, ED = unknown> = PropsTransformations<NeighborMergingOptions<ND, ED>>;
export function useNeighborMerging<ND = unknown, ED = unknown>() {
  return useTransformations<NeighborMergingOptions<ND, ED>, NeighborMerging<ND, ED>, ND, ED>('addNeighborMerging');
}
// export function useNodeClustering<ND = unknown, ED = unknown>() {
//   return useTransformations<NodeClusteringOptions<ND, ED>, NodeClustering<ND, ED>, ND, ED>('addNodeClustering');
// }
export type NodeCollapsingProps<ND = unknown, ED = unknown> = PropsTransformations<NodeCollapsingOptions<ND, ED>>;
export function useNodeCollapsing<ND = unknown, ED = unknown>() {
  return useTransformations<NodeCollapsingOptions<ND, ED>, NodeCollapsing<ND, ED>, ND, ED>('addNodeCollapsing');
}
export type VirtualPropertiesProps<ND = unknown, ED = unknown> = PropsTransformations<VirtualPropertiesOptions<ND, ED>>;
export function useVirtualProperties<ND = unknown, ED = unknown>() {
  return useTransformations<VirtualPropertiesOptions<ND, ED>, VirtualProperties<ND, ED>, ND, ED>('addVirtualProperties');
}
<script setup lang="ts">
import Ogma, { RawGraph, EventTypes } from "@linkurious/ogma";
import {
  provide,
  defineProps,
  ref,
  onMounted,
  withDefaults,
  watch,
  defineEmits,
} from "vue";
interface Emits {
  /**
   * See [addEdges](https://doc.linkurious.com/ogma/latest/api.html#Event:-addEdges)
   */
  (e: "addEdges", evt: EventTypes<any, any>["addEdges"]): void;
  /**
   * See [addGraph](https://doc.linkurious.com/ogma/latest/api.html#Event:-addGraph)
   */
  (e: "addGraph", evt: EventTypes<any, any>["addGraph"]): void;
  /**
   * See [addNodes](https://doc.linkurious.com/ogma/latest/api.html#Event:-addNodes)
   */
  (e: "addNodes", evt: EventTypes<any, any>["addNodes"]): void;
  /**
   * See [beforeRemoveEdges](https://doc.linkurious.com/ogma/latest/api.html#Event:-beforeRemoveEdges)
   */
  (
    e: "beforeRemoveEdges",
    evt: EventTypes<any, any>["beforeRemoveEdges"],
  ): void;
  /**
   * See [beforeRemoveNodes](https://doc.linkurious.com/ogma/latest/api.html#Event:-beforeRemoveNodes)
   */
  (
    e: "beforeRemoveNodes",
    evt: EventTypes<any, any>["beforeRemoveNodes"],
  ): void;
  /**
   * See [clearGraph](https://doc.linkurious.com/ogma/latest/api.html#Event:-clearGraph)
   */
  (e: "clearGraph", evt: EventTypes<any, any>["clearGraph"]): void;
  /**
   * See [click](https://doc.linkurious.com/ogma/latest/api.html#Event:-click)
   */
  (e: "click", evt: EventTypes<any, any>["click"]): void;
  /**
   * See [connectNodes](https://doc.linkurious.com/ogma/latest/api.html#Event:-connectNodes)
   */
  (e: "connectNodes", evt: EventTypes<any, any>["connectNodes"]): void;
  /**
   * See [destroy](https://doc.linkurious.com/ogma/latest/api.html#Event:-destroy)
   */
  (e: "destroy", evt: EventTypes<any, any>["destroy"]): void;
  /**
   * See [doubleclick](https://doc.linkurious.com/ogma/latest/api.html#Event:-doubleclick)
   */
  (e: "doubleclick", evt: EventTypes<any, any>["doubleclick"]): void;
  /**
   * See [dragEnd](https://doc.linkurious.com/ogma/latest/api.html#Event:-dragEnd)
   */
  (e: "dragEnd", evt: EventTypes<any, any>["dragEnd"]): void;
  /**
   * See [dragProgress](https://doc.linkurious.com/ogma/latest/api.html#Event:-dragProgress)
   */
  (e: "dragProgress", evt: EventTypes<any, any>["dragProgress"]): void;
  /**
   * See [dragStart](https://doc.linkurious.com/ogma/latest/api.html#Event:-dragStart)
   */
  (e: "dragStart", evt: EventTypes<any, any>["dragStart"]): void;
  /**
   * See [drop](https://doc.linkurious.com/ogma/latest/api.html#Event:-drop)
   */
  (e: "drop", evt: EventTypes<any, any>["drop"]): void;
  /**
   * See [edgesSelected](https://doc.linkurious.com/ogma/latest/api.html#Event:-edgesSelected)
   */
  (e: "edgesSelected", evt: EventTypes<any, any>["edgesSelected"]): void;
  /**
   * See [geoDisabled](https://doc.linkurious.com/ogma/latest/api.html#Event:-geoDisabled)
   */
  (e: "geoDisabled", evt: EventTypes<any, any>["geoDisabled"]): void;
  /**
   * See [geoEnabled](https://doc.linkurious.com/ogma/latest/api.html#Event:-geoEnabled)
   */
  (e: "geoEnabled", evt: EventTypes<any, any>["geoEnabled"]): void;
  /**
   * See [geoLoaded](https://doc.linkurious.com/ogma/latest/api.html#Event:-geoLoaded)
   */
  (e: "geoLoaded", evt: EventTypes<any, any>["geoLoaded"]): void;
  /**
   * See [gestureEnd](https://doc.linkurious.com/ogma/latest/api.html#Event:-gestureEnd)
   */
  (e: "gestureEnd", evt: EventTypes<any, any>["gestureEnd"]): void;
  /**
   * See [gestureProgress](https://doc.linkurious.com/ogma/latest/api.html#Event:-gestureProgress)
   */
  (e: "gestureProgress", evt: EventTypes<any, any>["gestureProgress"]): void;
  /**
   * See [gestureStart](https://doc.linkurious.com/ogma/latest/api.html#Event:-gestureStart)
   */
  (e: "gestureStart", evt: EventTypes<any, any>["gestureStart"]): void;
  /**
   * See [keydown](https://doc.linkurious.com/ogma/latest/api.html#Event:-keydown)
   */
  (e: "keydown", evt: EventTypes<any, any>["keydown"]): void;
  /**
   * See [keyup](https://doc.linkurious.com/ogma/latest/api.html#Event:-keyup)
   */
  (e: "keyup", evt: EventTypes<any, any>["keyup"]): void;
  /**
   * See [layoutComputed](https://doc.linkurious.com/ogma/latest/api.html#Event:-layoutComputed)
   */
  (e: "layoutComputed", evt: EventTypes<any, any>["layoutComputed"]): void;
  /**
   * See [layoutEnd](https://doc.linkurious.com/ogma/latest/api.html#Event:-layoutEnd)
   */
  (e: "layoutEnd", evt: EventTypes<any, any>["layoutEnd"]): void;
  /**
   * See [layoutStart](https://doc.linkurious.com/ogma/latest/api.html#Event:-layoutStart)
   */
  (e: "layoutStart", evt: EventTypes<any, any>["layoutStart"]): void;
  /**
   * See [mousedown](https://doc.linkurious.com/ogma/latest/api.html#Event:-mousedown)
   */
  (e: "mousedown", evt: EventTypes<any, any>["mousedown"]): void;
  /**
   * See [mousemove](https://doc.linkurious.com/ogma/latest/api.html#Event:-mousemove)
   */
  (e: "mousemove", evt: EventTypes<any, any>["mousemove"]): void;
  /**
   * See [mouseout](https://doc.linkurious.com/ogma/latest/api.html#Event:-mouseout)
   */
  (e: "mouseout", evt: EventTypes<any, any>["mouseout"]): void;
  /**
   * See [mouseover](https://doc.linkurious.com/ogma/latest/api.html#Event:-mouseover)
   */
  (e: "mouseover", evt: EventTypes<any, any>["mouseover"]): void;
  /**
   * See [mouseup](https://doc.linkurious.com/ogma/latest/api.html#Event:-mouseup)
   */
  (e: "mouseup", evt: EventTypes<any, any>["mouseup"]): void;
  /**
   * See [mousewheel](https://doc.linkurious.com/ogma/latest/api.html#Event:-mousewheel)
   */
  (e: "mousewheel", evt: EventTypes<any, any>["mousewheel"]): void;
  /**
   * See [nodesDragEnd](https://doc.linkurious.com/ogma/latest/api.html#Event:-nodesDragEnd)
   */
  (e: "nodesDragEnd", evt: EventTypes<any, any>["nodesDragEnd"]): void;
  /**
   * See [nodesDragProgress](https://doc.linkurious.com/ogma/latest/api.html#Event:-nodesDragProgress)
   */
  (
    e: "nodesDragProgress",
    evt: EventTypes<any, any>["nodesDragProgress"],
  ): void;
  /**
   * See [nodesDragStart](https://doc.linkurious.com/ogma/latest/api.html#Event:-nodesDragStart)
   */
  (e: "nodesDragStart", evt: EventTypes<any, any>["nodesDragStart"]): void;
  /**
   * See [nodesSelected](https://doc.linkurious.com/ogma/latest/api.html#Event:-nodesSelected)
   */
  (e: "nodesSelected", evt: EventTypes<any, any>["nodesSelected"]): void;
  /**
   * See [nodesUnselected](https://doc.linkurious.com/ogma/latest/api.html#Event:-nodesUnselected)
   */
  (e: "nodesUnselected", evt: EventTypes<any, any>["nodesUnselected"]): void;
  /**
   * See [removeEdges](https://doc.linkurious.com/ogma/latest/api.html#Event:-removeEdges)
   */
  (e: "removeEdges", evt: EventTypes<any, any>["removeEdges"]): void;
  /**
   * See [removeNodes](https://doc.linkurious.com/ogma/latest/api.html#Event:-removeNodes)
   */
  (e: "removeNodes", evt: EventTypes<any, any>["removeNodes"]): void;
  /**
   * See [rendererStateChange](https://doc.linkurious.com/ogma/latest/api.html#Event:-rendererStateChange)
   */
  (
    e: "rendererStateChange",
    evt: EventTypes<any, any>["rendererStateChange"],
  ): void;
  /**
   * See [resize](https://doc.linkurious.com/ogma/latest/api.html#Event:-resize)
   */
  (e: "resize", evt: EventTypes<any, any>["resize"]): void;
  /**
   * See [rotate](https://doc.linkurious.com/ogma/latest/api.html#Event:-rotate)
   */
  (e: "rotate", evt: EventTypes<any, any>["rotate"]): void;
  /**
   * See [tooltipHide](https://doc.linkurious.com/ogma/latest/api.html#Event:-tooltipHide)
   */
  (e: "tooltipHide", evt: EventTypes<any, any>["tooltipHide"]): void;
  /**
   * See [tooltipShow](https://doc.linkurious.com/ogma/latest/api.html#Event:-tooltipShow)
   */
  (e: "tooltipShow", evt: EventTypes<any, any>["tooltipShow"]): void;
  /**
   * See [transformationDestroyed](https://doc.linkurious.com/ogma/latest/api.html#Event:-transformationDestroyed)
   */
  (
    e: "transformationDestroyed",
    evt: EventTypes<any, any>["transformationDestroyed"],
  ): void;
  /**
   * See [transformationDisabled](https://doc.linkurious.com/ogma/latest/api.html#Event:-transformationDisabled)
   */
  (
    e: "transformationDisabled",
    evt: EventTypes<any, any>["transformationDisabled"],
  ): void;
  /**
   * See [transformationEnabled](https://doc.linkurious.com/ogma/latest/api.html#Event:-transformationEnabled)
   */
  (
    e: "transformationEnabled",
    evt: EventTypes<any, any>["transformationEnabled"],
  ): void;
  /**
   * See [transformationRefresh](https://doc.linkurious.com/ogma/latest/api.html#Event:-transformationRefresh)
   */
  (
    e: "transformationRefresh",
    evt: EventTypes<any, any>["transformationRefresh"],
  ): void;
  /**
   * See [transformationSetIndex](https://doc.linkurious.com/ogma/latest/api.html#Event:-transformationSetIndex)
   */
  (
    e: "transformationSetIndex",
    evt: EventTypes<any, any>["transformationSetIndex"],
  ): void;
  /**
   * See [updateEdgeData](https://doc.linkurious.com/ogma/latest/api.html#Event:-updateEdgeData)
   */
  (e: "updateEdgeData", evt: EventTypes<any, any>["updateEdgeData"]): void;
  /**
   * See [updateNodeData](https://doc.linkurious.com/ogma/latest/api.html#Event:-updateNodeData)
   */
  (e: "updateNodeData", evt: EventTypes<any, any>["updateNodeData"]): void;
  /**
   * See [viewChanged](https://doc.linkurious.com/ogma/latest/api.html#Event:-viewChanged)
   */
  (e: "viewChanged", evt: EventTypes<any, any>["viewChanged"]): void;
}
const emit = defineEmits<Emits>();
const allEvents = [
  "addEdges",
  "addGraph",
  "addNodes",
  "beforeRemoveEdges",
  "beforeRemoveNodes",
  "cameraZoom",
  "clearGraph",
  "click",
  "connectNodes",
  "destroy",
  "doubleclick",
  "dragEnd",
  "dragProgress",
  "dragStart",
  "drop",
  "edgesSelected",
  "edgesUnelected",
  "geoDisabled",
  "geoEnabled",
  "geoLoaded",
  "gestureEnd",
  "gestureProgress",
  "gestureStart",
  "keydown",
  "keyup",
  "layoutComputed",
  "layoutEnd",
  "layoutStart",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "mousewheel",
  "nodesDragEnd",
  "nodesDragProgress",
  "nodesDragStart",
  "nodesSelected",
  "nodesUnselected",
  "removeEdges",
  "removeNodes",
  "rendererStateChange",
  "resize",
  "rotate",
  "tooltipHide",
  "tooltipShow",
  "transformationDestroyed",
  "transformationDisabled",
  "transformationEnabled",
  "transformationRefresh",
  "transformationSetIndex",
  "updateEdgeData",
  "updateNodeData",
  "viewChanged",
];
const listenners: ((a: unknown) => unknown)[] = [];
function registerEvents() {
  if (!props.events) return;
  const ogma = props.ogma;
  (props.events === "all" ? allEvents : props.events).forEach((event) => {
    const handler = (evt) => {
      // @ts-ignore
      emit(event, evt);
    };
    listenners.push(handler);
    ogma.events.on(event as keyof EventTypes<any, any>, handler);
  });
}
function unregisterEvents() {
  const ogma = props.ogma;
  listenners.forEach((listenner) => {
    ogma.events.off(listenner);
  });
  listenners.length = 0;
}
/**
 * Ogma vue component.
 * @example ../../docs/examples/ogma.md
 * @displayName Ogma
 */
const container = ref<HTMLDivElement>();

const props = withDefaults(
  defineProps<{
    /**
     * The width of Ogma container
     */
    width?: number;
    /**
     * The height of Ogma container
     */
    height?: number;
    /**
     * The graph Ogma should render
     * @default empty graph
     */
    graph?: RawGraph;
    /**
     * The instance of Ogma linked to the component
     */
    ogma: Ogma<string, number>;
    /**
     * layoutOnMounted
     */
    layoutOnMounted?: boolean;

    events: (keyof EventTypes<any, any>)[] | "all";
  }>(),
  {
    width: 512,
    height: 512,
    layoutOnMounted: true,
    events: "all",
    graph: () => ({
      nodes: [],
      edges: [],
    }),
  },
);

watch(
  () => props.graph,
  (newGraph) => {
    if (newGraph) {
      props.ogma.setGraph(newGraph);
    }
  },
);

watch([props.width, props.height], ([width, height]) => {
  props.ogma.view.setSize({ width, height });
});
watch(
  () => props.events,
  () => {
    unregisterEvents();
    registerEvents();
  },
);

onMounted(() => {
  const ogma = props.ogma;
  provide("ogma", ogma);
  ogma.setContainer(container.value!);
  ogma.view.setSize({ width: props.width, height: props.height });
  ogma.setGraph(props.graph).then(() => {
    if (!props.layoutOnMounted) return;
    ogma.layouts.force({ locate: true, duration: 0 });
  });
  registerEvents();
});
</script>
<template>
  <div>
    <div ref="container" class="ogma-container" />
    <!-- @slot Put your Ogma components here -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import {
  provide,
  defineProps,
  ref,
  onMounted,
  withDefaults,
  watch,
  defineEmits,
} from "vue";
import Ogma, { RawGraph, EventTypes, AddEdgesEvent } from "@linkurious/ogma";
interface Emits {
  (eventName: 'hoverr', hovering: boolean): void;
  (eventName: 'changedd', newValue: number, id: string): void;
}
const emits = defineEmits<Emits>();
/*const allEvents = [
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
 *
const container = ref<HTMLDivElement>();

*/
const props =
  //  withDefaults(
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
  }>();
// ,
//   {
//     width: 512,
//     height: 512,
//     layoutOnMounted: true,
//     events: "all",
//     graph: () => ({
//       nodes: [],
//       edges: [],
//     }),
//   }
// );
/*
watch(
  () => props.graph,
  (newGraph) => {
    if (newGraph) {
      props.ogma.setGraph(newGraph);
    }
  }
);

watch([props.width, props.height], ([width, height]) => {
  props.ogma.view.setSize({ width, height });
});
watch(
  () => props.events,
  () => {
    unregisterEvents();
    registerEvents();
  }
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
});*/
</script>
<template>
  <div>
    <div ref="container" class="ogma-container"></div>
    <!-- @slot Put your Ogma components here -->
    <slot></slot>
  </div>
</template>

/* eslint-disable @typescript-eslint/no-unused-vars */
import Ogma, { EventTypes, RawGraph, Options } from "@linkurious/ogma";
import { defineComponent, h, PropType, SlotsType } from "vue";


export interface OgmaProps<ND = unknown, ED = unknown> {
  width?: number;
  height?: number;
  graph?: RawGraph<ND, ED>;
  options?: Options;
  layoutOnMounted?: boolean;
  events?: "all" | (keyof EventTypes<ND, ED>)[];
}
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
  "edgesUnselected",
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

export function useOgma<ND = unknown, ED = unknown>(og?: Ogma<ND, ED>) {
  const ogma = og || new Ogma<ND, ED>() as Ogma<ND, ED>;
  return defineComponent({
    slots: Object as SlotsType<{
      default: unknown;
    }>,
    provide() {
      return {
        ogma
      };
    },
    props: {
      options: {
        type: Object as PropType<OgmaProps<ND, ED>['options']>,
        required: false,
        default: () => ({})
      },
      width: {
        type: Number,
        default: 600
      },
      height: {
        type: Number,
        default: 400
      },
      graph: {
        type: Object as PropType<OgmaProps<ND, ED>['graph']>,
        default: () => ({ nodes: [], edges: [] })
      },
      layoutOnMounted: {
        type: Boolean,
        default: true
      },
      events: {
        type: [Array, String] as PropType<OgmaProps<ND, ED>['events']>,
        // eslint-disable-next-line
        default: () => 'all'
      }
    },
    emits: {
      addEdges(_payload: EventTypes<ND, ED>['addEdges']) { return true; },
      addGraph(_payload: EventTypes<ND, ED>['addGraph']) { return true; },
      addNodes(_payload: EventTypes<ND, ED>['addNodes']) { return true; },
      beforeRemoveEdges(_payload: EventTypes<ND, ED>['beforeRemoveEdges']) { return true; },
      beforeRemoveNodes(_payload: EventTypes<ND, ED>['beforeRemoveNodes']) { return true; },
      // cameraZoom(_payload: EventTypes<ND, ED>['cameraZoom']) { return true; },
      clearGraph(_payload: EventTypes<ND, ED>['clearGraph']) { return true; },
      click(_payload: EventTypes<ND, ED>['click']) { return true; },
      connectNodes(_payload: EventTypes<ND, ED>['connectNodes']) { return true; },
      destroy(_payload: EventTypes<ND, ED>['destroy']) { return true; },
      doubleclick(_payload: EventTypes<ND, ED>['doubleclick']) { return true; },
      dragEnd(_payload: EventTypes<ND, ED>['dragEnd']) { return true; },
      dragProgress(_payload: EventTypes<ND, ED>['dragProgress']) { return true; },
      dragStart(_payload: EventTypes<ND, ED>['dragStart']) { return true; },
      drop(_payload: EventTypes<ND, ED>['drop']) { return true; },
      edgesSelected(_payload: EventTypes<ND, ED>['edgesSelected']) { return true; },
      edgesUnselected(_payload: EventTypes<ND, ED>['edgesUnselected']) { return true; },
      geoDisabled(_payload: EventTypes<ND, ED>['geoDisabled']) { return true; },
      geoEnabled(_payload: EventTypes<ND, ED>['geoEnabled']) { return true; },
      geoLoaded(_payload: EventTypes<ND, ED>['geoLoaded']) { return true; },
      gestureEnd(_payload: EventTypes<ND, ED>['gestureEnd']) { return true; },
      gestureProgress(_payload: EventTypes<ND, ED>['gestureProgress']) { return true; },
      gestureStart(_payload: EventTypes<ND, ED>['gestureStart']) { return true; },
      keydown(_payload: EventTypes<ND, ED>['keydown']) { return true; },
      keyup(_payload: EventTypes<ND, ED>['keyup']) { return true; },
      layoutComputed(_payload: EventTypes<ND, ED>['layoutComputed']) { return true; },
      layoutEnd(_payload: EventTypes<ND, ED>['layoutEnd']) { return true; },
      layoutStart(_payload: EventTypes<ND, ED>['layoutStart']) { return true; },
      mousedown(_payload: EventTypes<ND, ED>['mousedown']) { return true; },
      mousemove(_payload: EventTypes<ND, ED>['mousemove']) { return true; },
      mouseout(_payload: EventTypes<ND, ED>['mouseout']) { return true; },
      mouseover(_payload: EventTypes<ND, ED>['mouseover']) { return true; },
      mouseup(_payload: EventTypes<ND, ED>['mouseup']) { return true; },
      mousewheel(_payload: EventTypes<ND, ED>['mousewheel']) { return true; },
      nodesDragEnd(_payload: EventTypes<ND, ED>['nodesDragEnd']) { return true; },
      nodesDragProgress(_payload: EventTypes<ND, ED>['nodesDragProgress']) { return true; },
      nodesDragStart(_payload: EventTypes<ND, ED>['nodesDragStart']) { return true; },
      nodesSelected(_payload: EventTypes<ND, ED>['nodesSelected']) { return true; },
      nodesUnselected(_payload: EventTypes<ND, ED>['nodesUnselected']) { return true; },
      removeEdges(_payload: EventTypes<ND, ED>['removeEdges']) { return true; },
      removeNodes(_payload: EventTypes<ND, ED>['removeNodes']) { return true; },
      rendererStateChange(_payload: EventTypes<ND, ED>['rendererStateChange']) { return true; },
      resize(_payload: EventTypes<ND, ED>['resize']) { return true; },
      rotate(_payload: EventTypes<ND, ED>['rotate']) { return true; },
      tooltipHide(_payload: EventTypes<ND, ED>['tooltipHide']) { return true; },
      tooltipShow(_payload: EventTypes<ND, ED>['tooltipShow']) { return true; },
      transformationDestroyed(_payload: EventTypes<ND, ED>['transformationDestroyed']) { return true; },
      transformationDisabled(_payload: EventTypes<ND, ED>['transformationDisabled']) { return true; },
      transformationEnabled(_payload: EventTypes<ND, ED>['transformationEnabled']) { return true; },
      transformationRefresh(_payload: EventTypes<ND, ED>['transformationRefresh']) { return true; },
      transformationSetIndex(_payload: EventTypes<ND, ED>['transformationSetIndex']) { return true; },
      updateEdgeData(_payload: EventTypes<ND, ED>['updateEdgeData']) { return true; },
      updateNodeData(_payload: EventTypes<ND, ED>['updateNodeData']) { return true; },
      viewChanged(_payload: EventTypes<ND, ED>['viewChanged']) { return true; },
    },
    data() {
      return {
        container: null as HTMLElement | null,
        listeners: [] as ((evt: unknown) => void)[]
      };
    },
    watch: {
      graph(newGraph) {
        ogma.setGraph(newGraph);
      },
      width(newWidth) {
        ogma.view.setSize({ width: newWidth, height: this.height });
      },
      height(newHeight) {
        ogma.view.setSize({ width: this.width, height: newHeight });
      },
      events() {
        this.unregisterEvents();
        this.registerEvents();
      }
    },
    mounted() {
      const { width, height, graph, layoutOnMounted } = this;
      ogma.setContainer(this.$refs.container! as HTMLElement);
      ogma.view.setSize({ width, height });
      ogma.setGraph(graph!).then(() => {
        if (!layoutOnMounted) return;
        ogma.layouts.force({ locate: true, duration: 0 });
      });
      this.registerEvents();
    },
    methods: {
      registerEvents() {
        const { events, listeners } = this;
        if (!events) return;
        (events === "all" ? allEvents : events).forEach((event) => {
          const handler = (evt) => {
            // @ts-ignore
            this.$emit(event, evt);
          };
          listeners.push(handler);
          ogma.events.on(event as keyof EventTypes<ND, ED>, handler);
        });
      },
      unregisterEvents() {
        const { listeners } = this;
        listeners.forEach((listener) => {
          ogma.events.off(listener);
        });
        listeners.length = 0;
      }
    },
    render() {
      return h("div", {
        ref: "container",
        class: 'ogma-container'
      }, this.$slots.default?.());
    },
  });

}

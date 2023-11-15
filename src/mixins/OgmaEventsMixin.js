const ogmaEvents = [
  "addEdges",
  'addGraph',
  "addNodes",
  "beforeRemoveEdges",
  "beforeRemoveNodes",
  "cameraZoom",
  "clearGraph",
  "click",
  "connectNodes",
  'destroy',
  "doubleclick",
  "dragEnd",
  "dragProgress",
  "dragStart",
  "drop",
  // "edgeClassAdded_MyClass",
  // "edgeClassRemoved_MyClass",
  "edgesSelected",
  "edgesUnelected",
  "geoDisabled",
  "geoEnabled",
  "geoLoaded",
  "gestureEnd",
  "gestureProgress",
  "gestureStart",
  'keydown',
  'keyup',
  "layoutComputed",
  "layoutEnd",
  "layoutStart",
  "mousedown",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "mousewheel",
  // "nodeClassAdded_MyClass",
  // "nodeClassRemoved_MyClass",
  "nodesDragEnd",
  "nodesDragProgress",
  "nodesDragStart",
  "nodesSelected",
  "nodesUnselected",
  "removeEdges",
  "removeNodes",
  "rendererStateChange",
  "resize",
  'rotate',
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

export default {
  props: {
    /**
     * The Ogma events list you want the component to emit. Default is all, you can pass and array: ['addEdges', 'addNodes']
     */
    events: { default: "all", type: [String, Array] },
  },
  data() {
    return {
      _ogmaListeners: [],
    };
  },
  mounted() {
    this.registerEvents();
  },
  beforeDestroyed() {
    this.unregisterEvents();
  },
  watch: {
    events: {
      handler() {
        this.unRegisterEvents();
        this.registerEvents();
      },
    },
  },
  methods: {
    registerEvents() {
      if (!this.events) return;
      const ogma = this.ogma;
      let eventsToregister = this.events;
      if (this.events === "all") {
        eventsToregister = ogmaEvents;
      }
      eventsToregister.forEach((event) => {
        const handler = (evt) => {
          /**
           * Ogma event. Please refer to the list of Ogma events [here](https://doc.linkurio.us/ogma/latest/api.html#Event:-addEdges)
           *
           * @event ogma-event
           */
          this.$emit(event, evt);
        };
        this._ogmaListeners.push(handler);
        ogma.events.on(event, handler);
      });
    },
    unregisterEvents() {
      const ogma = this.ogma;
      this._ogmaListeners.forEach((listenner) => {
        ogma.events.off(listenner);
      });
      this._ogmaListeners = [];
    },
  },
};

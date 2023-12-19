<template>
  <div id="app">
    <Ogma :graph="graph" :width="width" :height="height">
      <template>
        <StyleRule :node-attributes="rule.nodeAttributes" />
        <Tooltip :visible="tooltip.visible" :size="tooltip.size" :position="tooltip.position">
          <div class="tooltip">{{ tooltip.content }}</div>
        </Tooltip>
        <NodeGrouping :options="grouping.options" :enabled="grouping.enabled" @enabled="onGroupingEnabled" />
        <NodeFilter :options="filter.options" :enabled="filter.enabled" @enabled="onFilterEnabled" />-->
        <Canvas :visible="canvas.visible" :render="canvas.render" :level="canvas.level" />
        <Layer>
          <UX v-model:grouping="grouping" v-model:filter="filter" v-model:rule="rule" />
        </Layer>
      </template>
    </Ogma>
  </div>
</template>

<script setup lang="ts">
import {
  Canvas,
  StyleRule,
  Layer,
  useNodeGrouping,
  Tooltip,
  useNodeFilter,
  useEdgeFilter,
  NodeFilterProps,
  useOgma,
  NodeGroupingProps,
  CanvasLayerProps
} from "../../src/main";

import UX from "./UX.vue";
import { computed, ref, provide, watch } from "vue";

type ND = { id: number; };
type ED = { source: number; target: number; };

const NodeGrouping = useNodeGrouping<ND, ED>();
const NodeFilter = useNodeFilter<ND, ED>();
const EdgeFilter = useEdgeFilter<ND, ED>();
const width = ref(window.innerWidth);
const height = ref(window.innerHeight);
const Ogma = useOgma<ND, ED>();
const graph = ref({
  nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
  edges: [{ source: 0, target: 1 }],
});
const filter = ref<NodeFilterProps<ND, ED>>({
  options: {
    criteria: (node) => +node.getId() % 2,
  },
  enabled: true,
  // events: ["enabled", "destroyed"],
});
const rule = ref({
  nodeAttributes: {
    color: "rgba(74, 160, 100, 1)",
  },
});
const tooltip = ref({
  visible: false,
  enabled: false,
  position: {
    x: 0,
    y: 0,
  },
  size: {
    width: "unset",
    height: "unset",
  },
  content: "",
});

const grouping = ref<NodeGroupingProps<ND, ED>>({
  options: {
    nodeSelector: () => true,
    duration: 1000,
    groupIdFunction: (node) => node.getId() % 2,
    showContents: true,
  },
  enabled: false,
  // events: ["enabled", "destroyed"],
});
const canvas = ref<CanvasLayerProps>({
  render: (ctx) => {
    ctx.fillRect(0, 0, 100, 100);
  },
  isStatic: true,
  visible: true,
  level: -1,
  noClear: false,
});

watch([filter], ([n]) => {
  console.log('filter', n);
});
function onGroupingEnabled(grouping) {
  console.log("grouping enabled", grouping);
}
function onFilterEnabled(filter) {
  console.log("filter enabled", filter);
}
// function onTooltipToggle(e) {
//   this.tooltip.enabled = e;
//   const selectedNodes = this.ogma.getSelectedNodes();
//   if (selectedNodes.size) {
//     // show the tooltip if some nodes are selected
//     this.onNodesSelected({ nodes: selectedNodes });
//   }
// }
// function onNodesUnselected() {
//   const selectedNodes = this.ogma.getSelectedNodes();
//   if (selectedNodes.size) return;
//   this.tooltip = {
//     ...this.tooltip,
//     visible: false,
//   };
// }
function onNodesSelected({ nodes }) {
  this.tooltip = {
    ...this.tooltip,
    position: {
      x:
        nodes.get(0).getAttribute("x") +
        5 +
        nodes.get(0).getAttribute("radius"),
      y: nodes.get(0).getAttribute("y"),
    },
    content: `${nodes.get(0).getId()} is selected`,
    visible: true && this.tooltip.enabled,
  };
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>


<style>
#app {
  width: 100%;
  align-content: space-around;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
  border: 1px solid blue;
}

#app canvas {
  width: 100vw;
  height: 100vh;
  border: 1px solid green;
}

.tooltip {
  background-color: #ddd;
  border-radius: 1px;
  padding: 2px;
  font-size: 2px;
}
</style>

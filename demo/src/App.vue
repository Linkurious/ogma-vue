<template>
  <div id="app">
    <Ogma @addEdges="e => e" />
    <Ogma :ogma="ogma" :graph="graph" :width="width" :height="height">
      <template>
        <Layer :level="1" :visible="true">
          <p>hello</p>
        </Layer>
        <!-- <StyleRule :options="rule" />
        <Tooltip
          :visible="tooltip.visible"
          :size="tooltip.size"
          :position="tooltip.position"
        >
          <div class="tooltip">{{ tooltip.content }}</div>
        </Tooltip>
        <NodeGrouping
          :options="grouping.options"
          :events="grouping.events"
          @enabled="onGroupingEnabled"
        />
        <NodeFilter
          :options="filter.options"
          :events="filter.events"
          @enabled="onFilterEnabled"
        />-->
        <Canvas :visible="canvas.visible" :render="canvas.draw" :draw="canvas.draw" :opacity="canvas.opacity"
          :level="canvas.level" :options="canvas.options" />
        <EdgeFilter :enabled="true" :duration="1000" :options="{
          criteria: (edge) => edge.getData(),
        }" />
      </template>
    </Ogma>
    <!-- <UX :ogma="ogma" @tooltipToggle="onTooltipToggle" /> -->
  </div>
</template>

<script setup lang="ts">
import Ogma from "../../src/components/Ogma.vue";
// import { Ogma } from "../../dist/ogma-vue.js";
import Layer from "../../src/components/layers/Layer.vue";
import Canvas from "../../src/components/layers/Canvas.vue";

import StyleRule from "../../src/components/styles/StyleRule.vue";
import NodeGrouping from "../../src/components/transformations/NodeGrouping.vue";
import Tooltip from "../../src/components/layers/Overlay.vue";
import NodeFilter from "../../src/components/transformations/NodeFilter.vue";
import EdgeFilter from "../../src/components/transformations/EdgeFilter.vue";

import UX from "./UX.vue";
import { computed, ref, provide } from "vue";
import OgmaTs from "@linkurious/ogma";

type ND = { id: number; };
type ED = { source: number; target: number; };
const ogma = new OgmaTs<ND, ED>();
provide("ogma", ogma);
const width = ref(window.innerWidth);
const height = ref(window.innerHeight);
const canvas = ref({
  draw: (ctx) => {
    const node = ogma.getNodes().get(4);
    if (!node) return;
    const pos = node.getPosition();
    ctx.fillRect(pos.x, pos.y, 10, 10);
  },
  visible: true,
  opacity: 1,
  level: -Infinity,
  options: {},
});
const graph = ref({
  nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
  edges: [{ source: 0, target: 1 }],
});
const filter = ref({
  options: {
    criteria: () => true,
  },
  events: ["enabled", "destroyed"],
});
const rule = ref({
  nodeAttributes: {
    color: "rgba(74, 160, 100, 1)",
  },
});
setTimeout(() => {
  canvas.value = {
    ...canvas.value,
    level: 2
  };
  console.log(canvas.value.level);
}, 2000)

/*
export default {
  name: "App",
  data() {
    return {
      ogma,
      width: window.innerWidth,
      height: window.innerHeight,
      canvas: {
        draw: (ctx) => {
          const node = ogma.getNodes().get(4);
          if (!node) return;
          const pos = node.getPosition();
          ctx.fillRect(pos.x, pos.y, 10, 10);
        },
      },
      rule: {
        nodeAttributes: {
          color: "rgba(74, 160, 100, 1)",
        },
      },
      grouping: {
        options: {
          nodeSelector: () => true,
          duration: 1000,
          groupIdFunction: (node) => node.getId() % 2,
          showContents: true,
          enabled: false,
        },
        events: ["enabled", "destroyed"],
      },
     
      tooltip: {
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
      },
      graph: {
        nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
        edges: [],
      },
    };
  },
  provide() {
    return {
      grouping: this.grouping,
      filter: this.filter,
      rule: this.rule,
      tooltip: computed(() => this.tooltip),
    };
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    window.ogma = ogma;
  },
  methods: {
    onGroupingEnabled(grouping) {
      console.log("grouping enabled", grouping);
    },
    onFilterEnabled(filter) {
      console.log("filter enabled", filter);
    },
    onTooltipToggle(e) {
      this.tooltip.enabled = e;
      const selectedNodes = this.ogma.getSelectedNodes();
      if (selectedNodes.size) {
        // show the tooltip if some nodes are selected
        this.onNodesSelected({ nodes: selectedNodes });
      }
    },
    onNodesUnselected() {
      const selectedNodes = this.ogma.getSelectedNodes();
      if (selectedNodes.size) return;
      this.tooltip = {
        ...this.tooltip,
        visible: false,
      };
    },
    onNodesSelected({ nodes }) {
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
    },
  },
  components: {
    OgmaVue,
    StyleRule,
    NodeGrouping,
    NodeFilter,
    Tooltip,
    // Canvas,
    UX,
  },
};*/
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

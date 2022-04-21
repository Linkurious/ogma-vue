<template>
  <div id="app">
    <OgmaVue :ogma="ogma" :graph="graph" :width="width" :height="height"
    @nodesSelected="onNodesSelected"
    >
      <template>
        <StyleRule :options="rule" />
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
        />
        <Canvas
          :visible="canvas.visible"
          :draw="canvas.draw"
          :opacity="canvas.opacity"
          :index="canvas.index"
          :options="canvas.options"
        />
      </template>
    </OgmaVue>
    <UX :ogma="ogma" @tooltipToggle="onTooltipToggle"/>
  </div>
</template>

<script>
import OgmaVue from "../../src/components/Ogma.vue";
import StyleRule from "../../src/components/styles/StyleRule.vue";
import NodeGrouping from "../../src/components/transformations/NodeGrouping.vue";
import Tooltip from "../../src/components/layers/Overlay.vue";
import NodeFilter from "../../src/components/transformations/NodeFilter.vue";
import UX from "./UX.vue";
import {computed} from "vue";
import Ogma from "@linkurious/ogma";

const ogma = new Ogma();

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
        opacity: 1,
        index: 1,
        options: {},
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
      filter: {
        options: {
          criteria: (node) => node.getId() % 2,
          duration: 1000,
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
      tooltip: computed(() => this.tooltip)
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>


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

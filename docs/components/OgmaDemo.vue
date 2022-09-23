<template>
  <div id="OgmaDemo">
    <OgmaVue :ogma="ogma" :graph="graph" :width="width" :height="height"
    @nodesSelected="onNodesSelected"
    @nodesUnselected="onNodesUnselected"

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
  name: "OgmaDemo",
  data() {
    return {
      ogma,
      width: 850,
      height: 512,
      rule: {
        nodeSelector: (node) => !node.isVirtual(),
        nodeAttributes: {
          color: "rgba(74, 160, 100, 1)",
        },
      },
      grouping: {
        options: {
          nodeSelector: () => true,
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
      const selectedNodes =this.ogma.getSelectedNodes();
      if(selectedNodes.size){
        // show the tooltip if some nodes are selected
        this.onNodesSelected({nodes: selectedNodes})
      }
    },
    onNodesUnselected(){
      const selectedNodes = this.ogma.getSelectedNodes();
      if(selectedNodes.size) return;
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
    UX,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>


<style>
#OgmaDemo {
  display: flex;
  flex-direction: row;
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

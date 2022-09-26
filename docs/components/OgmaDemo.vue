<template>
  <div id="OgmaDemo">
    <OgmaVue :ogma="ogma" :graph="graph" :width="width" :height="height">
      <template>
        <StyleRule :options="rule" />
        <NodeFilter :options="filter.options" />
      </template>
    </OgmaVue>
    <UX :ogma="ogma" />
  </div>
</template>

<script>
import UX from "./UX.vue";
import OgmaVue from "../../src/components/Ogma.vue";
import NodeFilter from "../../src/components/transformations/NodeFilter.vue";
import { computed } from "vue";
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
      filter: {
        options: {
          criteria: (node) => {
            const a = node.getId() % 3;
            console.log(a);
            return a;
          },
          enabled: false,
        },
        events: ["enabled", "destroyed"],
      },
      tooltip: {
        visible: true,
        enabled: true,
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
        edges: [
          { source: 0, target: 1 },
          { source: 1, target: 2 },
          { source: 2, target: 3 },
          { source: 3, target: 4 },
        ],
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
  methods: {},
  components: {
    OgmaVue,
    NodeFilter,
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

<template>
  <div id="app">
    <Ogma :graph="graph" :width="width" :height="height">
      <template>
        <StyleRule :node-attributes="rule.nodeAttributes" />
        <NodeGrouping :options="grouping.options" :enabled="grouping.enabled" @enabled="onGroupingEnabled"
          @disabled="onGroupingDisabled" />
        <NodeFilter :options="filter.options" :enabled="filter.enabled" @enabled="onFilterEnabled" />-->
        <Layer>
          <UX v-model:grouping="grouping" v-model:filter="filter" v-model:rule="rule" />
        </Layer>
      </template>
    </Ogma>
  </div>
</template>

<script setup lang="ts">
import {
  StyleRule,
  Layer,
  useNodeGrouping,
  useNodeFilter,
  NodeFilterProps,
  useOgma,
  NodeGroupingProps,
  StyleRuleProps,
} from "../../src/main";
import O from "@linkurious/ogma/dev";
import UX from "./UX.vue";
import { ref, watch } from "vue";

type ND = { id: number; };
type ED = { source: number; target: number; };

const NodeGrouping = useNodeGrouping<ND, ED>();
const NodeFilter = useNodeFilter<ND, ED>();
const width = ref(window.innerWidth);
const height = ref(window.innerHeight);
const ogma = new O();
const Ogma = useOgma<ND, ED>(ogma);
const graph = ref({
  nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
  edges: [{ source: 0, target: 1 }],
});
const filter = ref<NodeFilterProps<ND, ED>>({
  options: {
    criteria: (node) => node.isVirtual() || +node.getId() % 2,
  },
  enabled: false,
});
const rule = ref<StyleRuleProps>({
  nodeAttributes: {
    color: "rgba(74, 160, 100, 1)",
    opacity: node => node.isVirtual() ? 0.5 : 1,
  },
});

const grouping = ref<NodeGroupingProps<ND, ED>>({
  options: {
    nodeSelector: () => true,
    duration: 1000,
    groupIdFunction: (node) => node.getId() % 3,
    showContents: true,
  },
  enabled: false,
});

watch([filter], ([n]) => {
  console.log('filter', n);
});
function onGroupingEnabled() {
  ogma.layouts.force({ duration: 1000, locate: true });
}
function onGroupingDisabled() {
  ogma.transformations.afterNextUpdate()
    .then(() => {
      ogma.layouts.force({ duration: 1000, locate: true });
    });
}
function onFilterEnabled(filter) {
  console.log("filter enabled", filter);
}
</script>

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

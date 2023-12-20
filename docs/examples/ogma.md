```vue
<template>
  <Ogma :graph="graph" :options="options" @addNodes="onAddNodes">
    <NodeFilter :options="nodeFilterOptions" :enabled="true" />
    <NodeRule :attributes="nodeAttributes" />
  </Ogma>
</template>
<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import {
  Ogma,
  NodeFilter,
  NodeRule,
  OgmaProps,
  NodeFilterProps,
  NodeRuleProps,
} from "@linkurious/ogma-vue";

const graph = ref<OgmaProps["graph"]>({
  nodes: [],
  edges: [],
});
const nodeAttributes = ref<NodeRuleProps["attributes"]>({
  color: "#33dd66",
});
const nodeFilterOptions = ref<NodeFilterProps["options"]>({
  nodeFilter: (node) => node.data("type") === "person",
});

onMounted(() => {
  axios.fetch("/some/api").then(({ data }) => {
    graph.value = data;
  });
});

function onAddNodes(nodes: NodeList) {
  console.log("new nodes: ", nodes.getId());
}
</script>
```

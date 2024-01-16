```vue
<template>
  ...
  <StyleClass
    :edges="styleClass.edges"
    :nodeAttributes="styleClass.nodeAttributes"
    :nodes="styleClass.nodes"
    :edgeAttributes="styleClass.edgeAttributes"
  />
  ...
</template>
<script setup lang="ts">
import { StyleClass, StyleClassProps } from "@linkurious/ogma-vue";
const ogma = inject<ogma>("ogma")!;
const filter = ref<StyleClassProps>({
  nodeAttributes: {
    color: "blue",
  },
  edgeAttributes: {
    color: "blue",
  },
  nodes: () => ogma.getNodes(),
  edges: () => ogma.getEdge(),
});
</script>
```

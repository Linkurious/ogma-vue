```vue
<template>
  ...
  <NodeGrouping
    :options="grouping.options"
    :enabled="grouping.enabled"
    :duration="grouping.duration"
    @enabled="onEnabled"
  />
  ...
</template>
<script setup lang="ts">
import { NodeGrouping, NodeGroupingProps } from "@linkurious/ogma-vue";
const grouping = ref<NodeGroupingProps>({
  enabled: true,
  duration: 1000,
  options: {
    selector: () => true,
    groupIdFunction: (node) => node.getId() % 2,
  },
});
function onEnabled(transformation) {
  console.log("Enabled: ", transformation);
}
</script>
```

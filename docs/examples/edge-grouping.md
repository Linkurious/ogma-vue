```vue
<template>
  ...
  <EdgeGrouping
    :options="grouping.options"
    :enabled="grouping.enabled"
    :duration="grouping.duration"
    @enabled="onEnabled"
  />
  ...
</template>
<script setup lang="ts">
import { EdgeGrouping, EdgeGroupingProps } from "@linkurious/ogma-vue";
const grouping = ref<EdgeGroupingProps>({
  enabled: true,
  duration: 1000,
  options: {
    selector: () => true,
    groupIdFunction: (edge) => edge.getId() % 2,
  },
});
function onEnabled(transformation) {
  console.log("Enabled: ", transformation);
}
</script>
```

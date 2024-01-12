```vue
<template>
  ...
  <EdgeFilter
    :enabled="filter.enabled"
    :duration="filter.duration"
    :options="filter.options"
    @enabled="onEnabled"
  />
  ...
</template>
<script setup lang="ts">
import { EdgeFilter, EdgeFilterProps } from "@linkurious/ogma-vue";
const filter = ref<EdgeFilterProps>({
  enabled: true,
  duration: 1000,
  options: {
    criteria: () => true,
  },
});
function onEnabled(transformation) {
  console.log("Enabled: ", transformation);
}
</script>
```

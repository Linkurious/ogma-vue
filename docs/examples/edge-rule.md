```vue
<template>
  ...
  <EdgeRule :selector="rule.selector" :attributes="rule.attributes" />
  ...
</template>
<script setup lang="ts">
import { EdgeRule, EdgeRuleProps } from "@linkurious/ogma-vue";
const rule = ref<EdgeRuleProps>({
  attributes: {
    color: "blue",
  },
  selector: () => true,
});
</script>
```

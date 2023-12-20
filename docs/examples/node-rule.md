```vue
<template>
  ...
  <NodeRule :selector="rule.selector" :attributes="rule.attributes" />
  ...
</template>
<script setup lang="ts">
import { NodeRule, NodeRuleProps } from "@linkurious/ogma-vue";
const rule = ref<NodeRuleProps>({
  attributes: {
    color: "blue",
  },
  selector: () => true,
});
</script>
```

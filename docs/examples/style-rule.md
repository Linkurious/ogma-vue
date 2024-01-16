```vue
<template>
  ...
  <StyleRule
    :nodeSelector="rule.nodeSelector"
    :nodeAttributes="rule.nodeAttributes"
    :edgeSelector="rule.edgeSelector"
    :edgeAttributes="rule.edgeAttributes"
  />
  ...
</template>
<script setup lang="ts">
import { StyleRule, StyleRuleProps } from "@linkurious/ogma-vue";
const rule = ref<StyleRuleProps>({
  nodeAttributes: {
    color: "blue",
  },
  nodeSelector: () => true,
  edgeAttributes: {
    color: "blue",
  },
  edgeSelector: () => true,
});
</script>
```

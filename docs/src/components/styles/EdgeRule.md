# EdgeRule

Creates a [style rule](https://doc.linkurious.com/ogma/latest/api.html#Ogma-styles-addEdgeRule) for edges.

## Props

### edgeAttributes

- type: [`edgeAttributes`](https://doc.linkurious.com/ogma/latest/api.html#EdgeAttributes)
- default: `{}`

  The attributes to apply to the edges.

### selector

- type: `(edge: `[Edge](https://doc.linkurious.com/ogma/latest/api.html#Edge)`) => Boolean`
- default: `() => true`

  The selector function to apply to the edges.

## Example

```vue
<template>
  ...
  <EdgeRule
    :selector="ruleProps.selector"
    :edgeAttributes="ruleProps.edgeAttributes"
  />
  ...
</template>
<script setup lang="ts">
import { EdgeRule } from "@linkurious/ogma-vue";
  const ruleProps = ref<EdgeRuleProps> ({
    edgeAttributes: {
      color: "blue",
      text: (edge) => edge.getData("name"),
    },
    selector: (edge) => edge.getId() === "edge1",
  })
};
</script>
```

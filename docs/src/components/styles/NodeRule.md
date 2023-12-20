# NodeRule

Creates a [style rule](https://doc.linkurious.com/ogma/latest/api.html#Ogma-styles-addNodeRule) for nodes.

## Props

### nodeAttributes

- type: [`nodeAttributes`](https://doc.linkurious.com/ogma/latest/api.html#NodeAttributes)
- default: `{}`

  The attributes to apply to the nodes.

### selector

- type: `(node: `[Node](https://doc.linkurious.com/ogma/latest/api.html#Node)`) => Boolean`
- default: `() => true`

  The selector function to apply to the nodes.

## Example

```vue
<template>
  ...
  <NodeRule
    :selector="ruleProps.selector"
    :nodeAttributes="ruleProps.nodeAttributes"
  />
  ...
</template>
<script setup lang="ts">
import { NodeRule } from "@linkurious/ogma-vue";
  const ruleProps = ref<NodeRuleProps> ({
    nodeAttributes: {
      color: "blue",
      text: (node) => node.getData("name"),
    },
    selector: (node) => node.getId() === "node1",
  })
};
</script>
```

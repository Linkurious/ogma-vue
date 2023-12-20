# EdgeRule

Creates a [style class](https://doc.linkurious.com/ogma/latest/api.html#Ogma-styles-createClass) for nodes and edges. It is similar to [NodeRule](./NodeRule.md) and [EdgeRule](./EdgeRule.md) but provides a `nodes` and `edges` prop to apply the rule to a subset of nodes and edges instead of using a selector function.

## Props

### nodeAttributes

- type: [`nodeAttributes`](https://doc.linkurious.com/ogma/latest/api.html#NodeAttributes)
- default: `{}`

  The attributes to apply to the nodes.

### edgeAttributes

- type: [`edgeAttributes`](https://doc.linkurious.com/ogma/latest/api.html#EdgeAttributes)
- default: `{}`

  The attributes to apply to the edges.

### edges

- type: [`EdgeList`](https://doc.linkurious.com/ogma/latest/api.html#EdgeList)
- default: `undefined`

  The edges to apply the rule to.

### nodes

- type: [`NodeList`](https://doc.linkurious.com/ogma/latest/api.html#NodeList)
- default: `undefined`

  The nodes to apply the rule to.

## Example

```vue
<template>
  ...
  <StyleClass
    :edgeAttributes="ruleProps.edgeAttributes"
    :nodeSelector="ruleProps.nodeSelector"
    :nodes="ruleProps.nodes"
    :edges="ruleProps.edges"
  />
  ...
</template>
<script setup lang="ts">
import { StyleClass } from "@linkurious/ogma-vue";
  const ruleProps = ref<StyleClassProps> ({
    edges: () => ogma.getEdges(),
    edgeAttributes: {
      color: "blue",
      text: (edge) => edge.getData("name"),
    },
    nodes: () => ogma.getNodes(),
    nodeAttributes: {
      color: "blue",
      text: (node) => node.getData("name"),
    },
  })
};
</script>
```

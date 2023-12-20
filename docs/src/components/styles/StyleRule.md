# EdgeRule

Creates a [style rule](https://doc.linkurious.com/ogma/latest/api.html#Ogma-styles-addRule) for nodes and edges. It has more options than [NodeRule](./NodeRule.md) and [EdgeRule](./EdgeRule.md).

## Props

### nodeAttributes

- type: [`nodeAttributes`](https://doc.linkurious.com/ogma/latest/api.html#NodeAttributes)
- default: `{}`

  The attributes to apply to the nodes.

### edgeAttributes

- type: [`edgeAttributes`](https://doc.linkurious.com/ogma/latest/api.html#EdgeAttributes)
- default: `{}`

  The attributes to apply to the edges.

### edgeSelector

- type: `(edge: `[Edge](https://doc.linkurious.com/ogma/latest/api.html#Edge)`) => Boolean`
- default: `() => true`

  The selector function to apply to the edges.

### nodeSelector

- type: `(node: `[Node](https://doc.linkurious.com/ogma/latest/api.html#Node)`) => Boolean`
- default: `() => true`

  The selector function to apply to the nodes.

### edgeDependencies

- type: [`EdgeDependency`](https://doc.linkurious.com/ogma/latest/api.html#EdgeDependencies)
- default: `{}`

  The dependencies to on which the rule is update (datachange, extremities change etc). See [tutorial](https://doc.linkurious.com/ogma/latest/tutorials/styling-optimization/)

### nodeDependencies

- type: [`NodeDependency`](https://doc.linkurious.com/ogma/latest/api.html#NodeDependencies)
- default: `{}`

  The dependencies to on which the rule is update (datachange, extremities change etc). See [tutorial](https://doc.linkurious.com/ogma/latest/tutorials/styling-optimization/)

### edgeOutput

- type: [`EdgeOutput`](https://doc.linkurious.com/ogma/latest/api.html#EdgeOutput)
- default: `{}`

  Edge attributes assigned by the rule. If unspecified, they are inferred from the `edgeAttributes` field. See [tutorial](https://doc.linkurious.com/ogma/latest/tutorials/styling-optimization/)

### nodeOutput

- type: [`NodeOutput`](https://doc.linkurious.com/ogma/latest/api.html#NodeOutput)
- default: `{}`

  Node attributes assigned by the rule. If unspecified, they are inferred from the `nodeAttributes` field. See [tutorial](https://doc.linkurious.com/ogma/latest/tutorials/styling-optimization/)

## Example

```vue
<template>
  ...
  <StyleRule
    :edgeSelector="ruleProps.edgeSelector"
    :edgeAttributes="ruleProps.edgeAttributes"
    :nodeSelector="ruleProps.nodeSelector"
    :nodeAttributes="ruleProps.nodeAttributes"
  />
  ...
</template>
<script setup lang="ts">
import { StyleRule } from "@linkurious/ogma-vue";
  const ruleProps = ref<StyleRuleProps> ({
    edgeAttributes: {
      color: "blue",
      text: (edge) => edge.getData("name"),
    },
    selector: (edge) => edge.getId() === "edge1",
    nodeAttributes: {
      color: "blue",
      text: (node) => node.getData("name"),
    },
    selector: (node) => node.getId() === "node1",
  })
};
</script>
```

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

<!--@include: ../../../examples/edge-rule.md-->

# NodeClustering

Creates a transformation that group raw nodes before they are added to the graph,
speeding up loading time.

## Props

### enabled

- type: `boolean`
- default: `True`

  Whether the transformation is enabled or not.

### duration

- type: `number`
- default: `0`

  Animation duration.

### events

- type: `string | string[]`
- default: `'all'`
- values: `'all' | 'enabled' | 'disabled' | 'refreshed' | 'indexChanged' | 'destroyed'`

  Which events to register on.

### options

- type: `() => options: `[NodeClusteringOptions](https://doc.linkurious.com/ogma/latest/api.html#NodeClusteringOptions)
- default: `() => ({ })`

  Options for the transformation. See [NodeClusteringOptions](https://doc.linkurious.com/ogma/latest/api.html#NodeClusteringOptions).

## Events

### enabled

- payload: `transformation: NodeClustering`

Emitted when the transformation is enabled.

### disabled

- payload: `transformation: NodeClustering`

Emitted when the transformation is disabled.

### refreshed

- payload: `transformation: NodeClustering`

Emitted when the transformation is refreshed.

### indexChanged

- payload: `transformation: NodeClustering`

Emitted when the transformation index is changed. See [transformation pipeline](https://doc.linkurious.com/ogma/latest/examples/transformation-schema.html).

# NodeGrouping

Creates a transformation that groups nodes.

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

- type: `() => options: `[NodeGroupingOptions](https://doc.linkurious.com/ogma/latest/api.html#NodeGroupingOptions)
- default: `() => ({ })`

  Options for the transformation. See [NodeGroupingOptions](https://doc.linkurious.com/ogma/latest/api.html#NodeGroupingOptions).

## Events

### enabled

- payload: `transformation: NodeGrouping`

Emitted when the transformation is enabled.

### disabled

- payload: `transformation: NodeGrouping`

Emitted when the transformation is disabled.

### refreshed

- payload: `transformation: NodeGrouping`

Emitted when the transformation is refreshed.

### indexChanged

- payload: `transformation: NodeGrouping`

Emitted when the transformation index is changed. See [transformation pipeline](https://doc.linkurious.com/ogma/latest/examples/transformation-schema.html).

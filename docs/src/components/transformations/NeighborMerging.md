# NeighborMerging

Creates a transformation that generates merges node data into its neighbors.

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

- type: `() => options: `[NeighborMergingOptions](https://doc.linkurious.com/ogma/latest/api.html#NeighborMergingOptions)
- default: `() => ({ })`

  Options for the transformation. See [NeighborMergingOptions](https://doc.linkurious.com/ogma/latest/api.html#NeighborMergingOptions).

## Events

### enabled

- payload: `transformation: NeighborMerging`

Emitted when the transformation is enabled.

### disabled

- payload: `transformation: NeighborMerging`

Emitted when the transformation is disabled.

### refreshed

- payload: `transformation: NeighborMerging`

Emitted when the transformation is refreshed.

### indexChanged

- payload: `transformation: NeighborMerging`

Emitted when the transformation index is changed. See [transformation pipeline](https://doc.linkurious.com/ogma/latest/examples/transformation-schema.html).

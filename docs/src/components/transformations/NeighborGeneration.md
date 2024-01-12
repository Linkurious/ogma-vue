# NeighborGeneration

Creates a transformation that generates neighbors between unconnected nodes.

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

- type: `() => options: `[NeighborGenerationOptions](https://doc.linkurious.com/ogma/latest/api.html#NeighborGenerationOptions)
- default: `() => ({ })`

  Options for the transformation. See [NeighborGenerationOptions](https://doc.linkurious.com/ogma/latest/api.html#NeighborGenerationOptions).

## Events

### enabled

- payload: `transformation: NeighborGeneration`

Emitted when the transformation is enabled.

### disabled

- payload: `transformation: NeighborGeneration`

Emitted when the transformation is disabled.

### refreshed

- payload: `transformation: NeighborGeneration`

Emitted when the transformation is refreshed.

### indexChanged

- payload: `transformation: NeighborGeneration`

Emitted when the transformation index is changed. See [transformation pipeline](https://doc.linkurious.com/ogma/latest/examples/transformation-schema.html).

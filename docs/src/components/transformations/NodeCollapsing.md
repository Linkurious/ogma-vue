# NodeCollapsing

Creates a transformation collapsing two edges into one.

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

- type: `() => options: `[NodeCollapsingOptions](https://doc.linkurious.com/ogma/latest/api.html#NodeCollapsingOptions)
- default: `() => ({ })`

  Options for the transformation. See [NodeCollapsingOptions](https://doc.linkurious.com/ogma/latest/api.html#NodeCollapsingOptions).

## Events

### enabled

- payload: `transformation: NodeCollapsing`

Emitted when the transformation is enabled.

### disabled

- payload: `transformation: NodeCollapsing`

Emitted when the transformation is disabled.

### refreshed

- payload: `transformation: NodeCollapsing`

Emitted when the transformation is refreshed.

### indexChanged

- payload: `transformation: NodeCollapsing`

Emitted when the transformation index is changed. See [transformation pipeline](https://doc.linkurious.com/ogma/latest/examples/transformation-schema.html).

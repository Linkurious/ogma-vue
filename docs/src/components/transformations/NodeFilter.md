# NodeFilter

Creates a transformation that filters nodes based on a criteria.

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

- type: `() => ({ criteria: (node:`[Node](https://doc.linkurious.com/ogma/latest/api.html#Node)`) => Boolean })`
- default: `() => ({ criteria: () => true })`

  Options for the transformation. See [NodeFilterOptions](https://doc.linkurious.com/ogma/latest/api.html#NodeFilterOptions). Criteria is a function that takes a node as parameter and returns a boolean.

## Events

### enabled

- payload: `transformation: NodeFilter`

Emitted when the transformation is enabled.

### disabled

- payload: `transformation: NodeFilter`

Emitted when the transformation is disabled.

### refreshed

- payload: `transformation: NodeFilter`

Emitted when the transformation is refreshed.

### indexChanged

- payload: `transformation: NodeFilter`

Emitted when the transformation index is changed. See [transformation pipeline](https://doc.linkurious.com/ogma/latest/examples/transformation-schema.html).

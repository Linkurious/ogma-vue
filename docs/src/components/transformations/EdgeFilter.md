# EdgeFilter

Creates a transformation that filters edges based on a criteria.

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

- type: `() => ({ criteria: (edge:`[Edge](https://doc.linkurious.com/ogma/latest/api.html#Edge)`) => Boolean })`
- default: `() => ({ criteria: () => true })`

  Options for the transformation. See [EdgeFilterOptions](https://doc.linkurious.com/ogma/latest/api.html#EdgeFilterOptions). Criteria is a function that takes an edge as parameter and returns a boolean.

## Events

### enabled

- payload: `transformation: EdgeFilter`

Emitted when the transformation is enabled.

### disabled

- payload: `transformation: EdgeFilter`

Emitted when the transformation is disabled.

### refreshed

- payload: `transformation: EdgeFilter`

Emitted when the transformation is refreshed.

### indexChanged

- payload: `transformation: EdgeFilter`

Emitted when the transformation index is changed. See [transformation pipeline](https://doc.linkurious.com/ogma/latest/examples/transformation-schema.html).

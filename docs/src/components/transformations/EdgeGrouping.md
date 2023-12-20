# EdgeGrouping

Creates a transformation that groups edges.

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

- type: `() => options: `[EdgeGroupingOptions](https://doc.linkurious.com/ogma/latest/api.html#EdgeGroupingOptions)
- default: `() => ({ })`

  Options for the transformation. See [EdgeGroupingOptions](https://doc.linkurious.com/ogma/latest/api.html#EdgeGroupingOptions).

## Events

### enabled

- payload: `transformation: EdgeGrouping`

Emitted when the transformation is enabled.

### disabled

- payload: `transformation: EdgeGrouping`

Emitted when the transformation is disabled.

### refreshed

- payload: `transformation: EdgeGrouping`

Emitted when the transformation is refreshed.

### indexChanged

- payload: `transformation: EdgeGrouping`

Emitted when the transformation index is changed. See [transformation pipeline](https://doc.linkurious.com/ogma/latest/examples/transformation-schema.html).

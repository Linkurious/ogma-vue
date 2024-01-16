# VirtualProperties

Creates a transformation that adds data to nodes/edges.

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

- type: `() => options: `[VirtualPropertiesOptions](https://doc.linkurious.com/ogma/latest/api.html#VirtualPropertiesOptions)
- default: `() => ({ })`

  Options for the transformation. See [VirtualPropertiesOptions](https://doc.linkurious.com/ogma/latest/api.html#VirtualPropertiesOptions).

## Events

### enabled

- payload: `transformation: VirtualProperties`

Emitted when the transformation is enabled.

### disabled

- payload: `transformation: VirtualProperties`

Emitted when the transformation is disabled.

### refreshed

- payload: `transformation: VirtualProperties`

Emitted when the transformation is refreshed.

### indexChanged

- payload: `transformation: VirtualProperties`

Emitted when the transformation index is changed. See [transformation pipeline](https://doc.linkurious.com/ogma/latest/examples/transformation-schema.html).

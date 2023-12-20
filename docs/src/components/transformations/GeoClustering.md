# GeoClustering

Creates a transformation that groups nodes within geo mode.

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

- type: `() => options: `[GeoClusteringOptions](https://doc.linkurious.com/ogma/latest/api.html#GeoClusteringOptions)
- default: `() => ({ })`

  Options for the transformation. See [GeoClusteringOptions](https://doc.linkurious.com/ogma/latest/api.html#GeoClusteringOptions).

## Events

### enabled

- payload: `transformation: GeoClustering`

Emitted when the transformation is enabled.

### disabled

- payload: `transformation: GeoClustering`

Emitted when the transformation is disabled.

### refreshed

- payload: `transformation: GeoClustering`

Emitted when the transformation is refreshed.

### indexChanged

- payload: `transformation: GeoClustering`

Emitted when the transformation index is changed. See [transformation pipeline](https://doc.linkurious.com/ogma/latest/examples/transformation-schema.html).

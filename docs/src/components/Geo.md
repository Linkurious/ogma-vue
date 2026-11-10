# Geo

Turns the **legacy** geo mode (`ogma.geo`, Leaflet based) on and off.

For Mapbox GL, MapLibre GL, deck.gl or Google Maps (Ogma >= 6.1), use [GeoMap](./GeoMap.md).

## Usage

```vue
<Ogma :graph="graph">
  <Geo :options="{ tileUrlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png' }" />
</Ogma>
```

## Props

### enabled

- type: `boolean`
- default: `true`

  Whether the geo mode is on.

### options

- type: [GeoModeOptions](https://doc.linkurious.com/ogma/latest/api.html#GeoModeOptions)
- default: `() => ({})`

  Options of `ogma.geo.enable()`. Updates are applied with `ogma.geo.setOptions()`.

## Events

### enabled

Emitted when the geo mode is enabled.

### disabled

Emitted when the geo mode is disabled.

### error

- payload: `error: unknown`

Emitted when enabling or disabling fails.

The `geoEnabled`, `geoDisabled` and `geoLoaded` events of [Ogma](./Ogma.md) are still forwarded.

# Geo

Turns the geo mode on and off. It supports the new map integrations of Ogma (**Mapbox GL**, **MapLibre GL**,
**deck.gl** and **Google Maps**, from `@linkurious/ogma/geo`) as well as the **legacy** `ogma.geo` API (Leaflet).

The mode is picked from the props:

- `provider` + `providerType` or `adapter` given: new API. The map is created and owned by you, `Geo` only binds Ogma to it.
- neither given: legacy `ogma.geo.enable(options)` / `ogma.geo.disable()`. Existing code keeps working unchanged.

The new API requires `@linkurious/ogma` >= 6.1. Geo must be a child of [Ogma](./Ogma.md).

## Usage

```vue
<script setup lang="ts">
import maplibregl from "maplibre-gl";
import { onMounted, shallowRef } from "vue";
import { Ogma, Geo } from "@linkurious/ogma-vue";

const map = shallowRef();
onMounted(() => {
  map.value = new maplibregl.Map({
    container: "map",
    style: "https://demotiles.maplibre.org/style.json",
  });
});
</script>

<template>
  <div id="map" />
  <Ogma :graph="graph">
    <Geo
      v-if="map"
      :provider="map"
      provider-type="maplibre"
      :options="{ latitudePath: 'lat', longitudePath: 'lng' }"
    />
  </Ogma>
</template>
```

Legacy mode:

```vue
<Geo :options="{ tileUrlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png' }" />
```

## Props

### enabled

- type: `boolean`
- default: `true`

  Whether the geo mode is on.

### provider

- type: `object`

  A Mapbox GL, MapLibre GL, deck.gl `Deck` or Google Maps instance. Requires `providerType`. Changing it rebuilds the binding.

### providerType

- type: `'mapbox' | 'maplibre' | 'deck' | 'google'`

  Kind of `provider`.

### adapter

- type: `ProviderAdapter`

  A ready-made adapter (`createMapboxAdapter(map)`, ...). Takes precedence over `provider`.

### options

- type: `GeoOptions | GeoModeOptions`
- default: `() => ({})`

  With a provider or adapter: [GeoOptions](https://doc.linkurious.com/ogma/latest/api.html) (`latitudePath`, `longitudePath`,
  `getCoordinates`, `projection`, `syncCamera`, `syncOnDrag`, `hideNodesWithoutCoordinates`, `reprojectOnViewChange`,
  `sizeRatio`, `minNodeSize`, `animation`). Otherwise the legacy
  [GeoModeOptions](https://doc.linkurious.com/ogma/latest/api.html#GeoModeOptions). Updates are applied with `setOptions`.

## Events

### enabled

Emitted when the geo mode is enabled.

### disabled

Emitted when the geo mode is disabled.

### cameraSync

Emitted when the Ogma camera is synchronised with the map (provider mode only).

### error

- payload: `error: unknown`

Emitted when binding to the provider fails (e.g. missing `providerType`, Ogma < 6.1).

## Methods

### getGeo()

Returns the underlying `Geo` instance of `@linkurious/ogma/geo` (provider mode only, `null` otherwise), through a template ref.

The legacy `geoEnabled`, `geoDisabled` and `geoLoaded` events of [Ogma](./Ogma.md) are still forwarded.
`GeoClustering` remains available for both modes.

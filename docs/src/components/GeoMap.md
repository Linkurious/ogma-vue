# GeoMap

Binds a **Mapbox GL**, **MapLibre GL**, **deck.gl** or **Google Maps** instance to Ogma (`Geo` from `@linkurious/ogma/geo`,
requires `@linkurious/ogma` >= 6.1). The map is created and owned by you: `GeoMap` never destroys it, and nothing is bound
until `map` is defined. For the legacy Leaflet based mode, use [Geo](./Geo.md).

## Usage

```vue
<script setup lang="ts">
import maplibregl from "maplibre-gl";
import * as geoModule from "@linkurious/ogma/geo";
import { onMounted, shallowRef } from "vue";
import { Ogma, GeoMap } from "@linkurious/ogma-vue";

const map = shallowRef();
const geo = ref(false);
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
    <GeoMap
      provider="maplibre"
      :module="geoModule"
      :map="map"
      :enabled="geo"
      :options="{ latitudePath: 'lat', longitudePath: 'lng' }"
      @ready="(geo) => console.log(geo)"
    />
  </Ogma>
</template>
```

## Props

### provider

- type: `'mapbox' | 'maplibre' | 'deck' | 'google'`

  Library the map was created with.

### map

- type: `object`

  The map instance (for deck.gl, the `Deck` instance). Use `shallowRef` rather than `ref`. Changing it rebuilds the binding.

### module

- type: `typeof import('@linkurious/ogma/geo') | (() => Promise<module>)`

  The `@linkurious/ogma/geo` module, or a loader such as `() => import("@linkurious/ogma/geo")`. It is passed explicitly so
  that `@linkurious/ogma-vue` never imports it and still builds with Ogma < 6.1. With the UMD build, pass the global that
  exposes the geo module.

### adapter

- type: `ProviderAdapter`

  A ready-made adapter (`createMapboxAdapter(map)`, ...), used instead of `provider` + `map`.

### enabled

- type: `boolean`
- default: `false`

  Whether the geo mode is on.

### options

- type: `GeoOptions`
- default: `() => ({})`

  `latitudePath`, `longitudePath`, `getCoordinates`, `projection`, `syncCamera`, `syncOnDrag`, `hideNodesWithoutCoordinates`,
  `reprojectOnViewChange`, `sizeRatio`, `minNodeSize`, `animation`. Updates are applied with `setOptions`.

## Events

### ready

- payload: `geo: Geo`

Emitted when the binding is created.

### enabled / disabled

Emitted when the geo mode is enabled / disabled.

### cameraSync

Emitted when the Ogma camera is synchronised with the map.

### error

- payload: `error: unknown`

Emitted when binding fails (e.g. unknown `provider`, Ogma < 6.1).

## Methods

### getGeo()

Returns the `Geo` instance, or `null` until a map is bound (through a template ref).

## Notes

When the geo mode is on, make sure the Ogma canvas is transparent (`options: { backgroundColor: null }`) so the map shows through.
Keep the map mounted until `GeoMap` is unmounted or `map` is set to `undefined`.

import { useGeo, useGeoMap } from "../hooks";

/** Legacy geo mode (`ogma.geo`). */
export const Geo = useGeo();
/** Geo mode bound to a Mapbox GL, MapLibre GL, deck.gl or Google Maps instance (Ogma >= 6.1). */
export const GeoMap = useGeoMap();

<script setup lang="ts">
import Ogma from "@linkurious/ogma";
import type { GeoClustering, GeoClusteringOptions } from "@linkurious/ogma/dev";
import { inject, withDefaults, defineProps, defineEmits } from "vue";
import {
  PropsTransformations,
  useTransformation,
} from "../../mixins/useTransformation";
import type { EmitType } from "../../mixins/useTransformation";
/**
 * Creates an GeoClustering tranformation
 * See [GeoClustering](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addGeoClustering)
 * @displayName GeoClustering
 */

const ogma = inject<Ogma>("ogma")!;
type ND<C extends Ogma<any>> = C extends Ogma<infer T> ? T : unknown;
type ED<C extends Ogma<any, any>> = C extends Ogma<any, infer T> ? T : unknown;

const emit =
  defineEmits<EmitType<GeoClustering<ND<typeof ogma>, ED<typeof ogma>>>>();
const props = withDefaults(
  defineProps<
    PropsTransformations<GeoClusteringOptions<ND<typeof ogma>, ED<typeof ogma>>>
  >(),
  {
    /**
     * Wether the transformation is enabled or not.
     */
    enabled: false,
    /**
     * The duration of the transformation.
     */
    duration: 0,
    /**
     * The events to register to
     */
    events: "all",
    /**
     * The options to pass to the clustering. See [GeoClusteringOptions](https://doc.linkurious.com/ogma/latest/api.html#GeoClusteringOptions)
     */
    options: () => ({
      selector: () => true,
      edgeGenerator: () => ({}),
      nodeGenerator: () => ({}),
    }),
  },
);
useTransformation<
  ND<typeof ogma>,
  ED<typeof ogma>,
  GeoClusteringOptions<ND<typeof ogma>, ED<typeof ogma>>,
  GeoClustering<ND<typeof ogma>, ED<typeof ogma>>
>(props, (options) => ogma!.transformations.addGeoClustering(options), emit);
</script>
<template></template>

<script setup lang="ts">
import Ogma from "@linkurious/ogma";
import type {
  NodeClustering,
  NodeClusteringOptions,
} from "@linkurious/ogma/dev";
import { inject, withDefaults, defineProps, defineEmits } from "vue";
import {
  PropsTransformations,
  useTransformation,
} from "../../mixins/useTransformation";
import type { EmitType } from "../../mixins/useTransformation";
/**
 * Creates an NodeClustering tranformation
 * See [NodeClustering](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNodeClustering)
 * @displayName NodeClustering
 */

const ogma = inject<Ogma>("ogma")!;
type ND<C extends Ogma<any>> = C extends Ogma<infer T> ? T : unknown;
type ED<C extends Ogma<any, any>> = C extends Ogma<any, infer T> ? T : unknown;

const emit =
  defineEmits<EmitType<NodeClustering<ND<typeof ogma>, ED<typeof ogma>>>>();
const props = withDefaults(
  defineProps<
    PropsTransformations<
      NodeClusteringOptions<ND<typeof ogma>, ED<typeof ogma>>
    >
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
     * The options to pass to the clustering. See [NodeClusteringOptions](https://doc.linkurious.com/ogma/latest/api.html#NodeClusteringOptions)
     */
    options: () => ({
      edgeGenerator: () => ({}),
      groupIdFunction: () => "",
      nodeGenerator: () => ({}),
      selector: () => true,
    }),
  },
);
useTransformation<
  ND<typeof ogma>,
  ED<typeof ogma>,
  NodeClusteringOptions<ND<typeof ogma>, ED<typeof ogma>>,
  NodeClustering<ND<typeof ogma>, ED<typeof ogma>>
>(props, (options) => ogma!.transformations.addNodeClustering(options), emit);
</script>
<template></template>

<script setup lang="ts">
import Ogma from "@linkurious/ogma";
import type {
  NeighborMerging,
  NeighborMergingOptions,
} from "@linkurious/ogma/dev";
import { inject, withDefaults, defineProps, defineEmits } from "vue";
import {
  PropsTransformations,
  useTransformation,
} from "../../mixins/useTransformation";
import type { EmitType } from "../../mixins/useTransformation";
/**
 * Creates an NeighborMerging tranformation
 * See [NeighborMerging](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNeighborMerging)
 * @displayName NeighborMerging
 */

const ogma = inject<Ogma>("ogma")!;
type ND<C extends Ogma<any>> = C extends Ogma<infer T> ? T : unknown;
type ED<C extends Ogma<any, any>> = C extends Ogma<any, infer T> ? T : unknown;

const emit =
  defineEmits<EmitType<NeighborMerging<ND<typeof ogma>, ED<typeof ogma>>>>();
const props = withDefaults(
  defineProps<
    PropsTransformations<
      NeighborMergingOptions<ND<typeof ogma>, ED<typeof ogma>>
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
     * The options to pass to the merger. See [NeighborMergingOptions](https://doc.linkurious.com/ogma/latest/api.html#NeighborMergingOptions)
     */
    options: () => ({
      dataFunction: () => undefined,
      selector: () => true,
    }),
  },
);
useTransformation<
  ND<typeof ogma>,
  ED<typeof ogma>,
  NeighborMergingOptions<ND<typeof ogma>, ED<typeof ogma>>,
  NeighborMerging<ND<typeof ogma>, ED<typeof ogma>>
>(props, (options) => ogma!.transformations.addNeighborMerging(options), emit);
</script>
<template></template>

<script setup lang="ts">
import Ogma from "@linkurious/ogma";
import type { EdgeGrouping, EdgeGroupingOptions } from "@linkurious/ogma/dev";
import { inject, withDefaults, defineProps, defineEmits } from "vue";
import {
  PropsTransformations,
  useTransformation,
} from "../../mixins/useTransformation";
import type { EmitType } from "../../mixins/useTransformation";
/**
 * Creates an EdgeGrouping tranformation
 * See [EdgeGrouping](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addEdgeGrouping)
 * @example ../../../docs/examples/edge-grouping.md
 * @displayName EdgeGrouping
 */
const ogma = inject<Ogma>("ogma")!;
type ND<C extends Ogma<any>> = C extends Ogma<infer T> ? T : unknown;
type ED<C extends Ogma<any, any>> = C extends Ogma<any, infer T> ? T : unknown;

const emit =
  defineEmits<EmitType<EdgeGrouping<ND<typeof ogma>, ED<typeof ogma>>>>();
const props = withDefaults(
  defineProps<
    PropsTransformations<EdgeGroupingOptions<ND<typeof ogma>, ED<typeof ogma>>>
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
     * The options to pass to the edge grouping. See [EdgeGroupingOptions](https://doc.linkurious.com/ogma/latest/api.html#EdgeGroupingOptions)
     */
    options: () => ({}),
  },
);
useTransformation<
  ND<typeof ogma>,
  ED<typeof ogma>,
  EdgeGroupingOptions<ND<typeof ogma>, ED<typeof ogma>>,
  EdgeGrouping<ND<typeof ogma>, ED<typeof ogma>>
>(props, (options) => ogma!.transformations.addEdgeGrouping(options), emit);
</script>
<template></template>

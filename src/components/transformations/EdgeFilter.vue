<script setup lang="ts">
import { inject, withDefaults, defineProps, defineEmits } from "vue";
import {
  PropsTransformations,
  useTransformation,
} from "../../mixins/useTransformation";
import type { EmitType } from "../../mixins/useTransformation";
import Ogma from "@linkurious/ogma";
import type { EdgeFilter, EdgeFilterOptions } from "@linkurious/ogma/dev";

/**
 * Creates an EdgeFilter tranformation
 * See [EdgeFilter](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addEdgeFilter)
 * @example ../../../docs/examples/edge-filter.md
 * @displayName EdgeFilter
 */
const ogma = inject<Ogma>("ogma")!;
type ND<C extends Ogma<any>> = C extends Ogma<infer T> ? T : unknown;
type ED<C extends Ogma<any, any>> = C extends Ogma<any, infer T> ? T : unknown;

const emit = defineEmits<EmitType<EdgeFilter<ND<typeof ogma>, ED<typeof ogma>>>>();
const props = withDefaults(
  defineProps<PropsTransformations<EdgeFilterOptions<ND<typeof ogma>, ED<typeof ogma>>>>(),
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
     * The options to pass to the edge filer. See [EdgeFilterOptions](https://doc.linkurious.com/ogma/latest/api.html#EdgeFilterOptions)
     */
    options: () => ({
      criteria: () => true,
    }),
  }
);
useTransformation<
  ND<typeof ogma>,
  ED<typeof ogma>,
  EdgeFilterOptions<ND<typeof ogma>, ED<typeof ogma>>,
  EdgeFilter<ND<typeof ogma>, ED<typeof ogma>>
>(props, (options) => ogma!.transformations.addEdgeFilter(options), emit);
</script>
<template></template>
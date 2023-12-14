<script setup lang="ts">
import Ogma from "@linkurious/ogma";
import { EdgeFilter, EdgeFilterOptions } from "@linkurious/ogma/dev";
import { inject, withDefaults, defineProps, defineEmits } from "vue";
import {
  PropsTransformations,
  useTransformation,
} from "../../mixins/useTransformation";
import { EmitType } from "../../mixins/useTransformation";

/**
 * Creates an EdgeFilter tranformation
 * See  [EdgeFilter](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addEdgeFilter)
 * @example ../../../docs/examples/edge-filter.md
 * @displayName EdgeFilter
 */
const ogma = inject<Ogma>("ogma")!;
type ND<C extends Ogma<any>> = C extends Ogma<infer T> ? T : unknown;
type ED<C extends Ogma<any, any>> = C extends Ogma<any, infer T> ? T : unknown;

const emit =
  defineEmits<EmitType<EdgeFilter<ND<typeof ogma>, ED<typeof ogma>>>>();
const props = withDefaults(
  defineProps<
    PropsTransformations<EdgeFilterOptions<ND<typeof ogma>, ED<typeof ogma>>>
  >(),
  {
    /**
    * wether the transformation is enabled or not.
    */
    enabled: false,
    /**
     * duration of the transformation.
     * @default 0
     */
    duration: 0,
    /**
     * events to register to
     * @default all
     */
    events: "all",
    /**
     * options to pass to the edge filter. See [EdgeFilterOptions](https:/ / doc.linkurious.com / ogma / latest / api.html#EdgeFilterOptions);
     * @default () => ({ criteria: () => true })
     */
    options: () => ({
      criteria: () => true,
    }),
  },
);
useTransformation<
  ND<typeof ogma>,
  ED<typeof ogma>,
  EdgeFilterOptions<ND<typeof ogma>, ED<typeof ogma>>,
  EdgeFilter<ND<typeof ogma>, ED<typeof ogma>>
>(props, (options) => ogma!.transformations.addEdgeFilter(options), emit);
</script>
<template></template>

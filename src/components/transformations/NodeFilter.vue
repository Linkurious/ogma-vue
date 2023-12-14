<script setup lang="ts">
import Ogma from "@linkurious/ogma";
import type { NodeFilter, NodeFilterOptions } from "@linkurious/ogma/dev";
import { inject, withDefaults, defineProps, defineEmits } from "vue";
import {
  PropsTransformations,
  useTransformation,
} from "../../mixins/useTransformation";
import type { EmitType } from "../../mixins/useTransformation";

/**
 * Creates an NodeFilter tranformation
 * See [NodeFilter](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNodeFilter)
 * @example ../../../docs/examples/node-filter.md
 * @displayName NodeFilter
 */
const ogma = inject<Ogma>("ogma")!;
type ND<C extends Ogma<any>> = C extends Ogma<infer T> ? T : unknown;
type ED<C extends Ogma<any, any>> = C extends Ogma<any, infer T> ? T : unknown;

const emit =
  defineEmits<EmitType<NodeFilter<ND<typeof ogma>, ED<typeof ogma>>>>();
const props = withDefaults(
  defineProps<
    PropsTransformations<NodeFilterOptions<ND<typeof ogma>, ED<typeof ogma>>>
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
     * The options to pass to the filter. See [NodeFilterOptions](https://doc.linkurious.com/ogma/latest/api.html#NodeFilterOptions)
     */
    options: () => ({
      selector: () => true,
    }),
  },
);
useTransformation<
  ND<typeof ogma>,
  ED<typeof ogma>,
  NodeFilterOptions<ND<typeof ogma>, ED<typeof ogma>>,
  NodeFilter<ND<typeof ogma>, ED<typeof ogma>>
>(props, (options) => ogma!.transformations.addNodeFilter(options), emit);
</script>
<template></template>

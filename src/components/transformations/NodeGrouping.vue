<script setup lang="ts">
import Ogma from "@linkurious/ogma";
import type { NodeGrouping, NodeGroupingOptions } from "@linkurious/ogma/dev";
import { inject, withDefaults, defineProps, defineEmits } from "vue";
import {
  PropsTransformations,
  useTransformation,
} from "../../mixins/useTransformation";
import type { EmitType } from "../../mixins/useTransformation";
/**
 * Creates an NodeGrouping tranformation
 * See [NodeGrouping](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNodeGrouping)
 * @example ../../../docs/examples/node-grouping.md
 * @displayName NodeGrouping
 */
const ogma = inject<Ogma>("ogma")!;
type ND<C extends Ogma<any>> = C extends Ogma<infer T> ? T : unknown;
type ED<C extends Ogma<any, any>> = C extends Ogma<any, infer T> ? T : unknown;

const emit =
  defineEmits<EmitType<NodeGrouping<ND<typeof ogma>, ED<typeof ogma>>>>();
const props = withDefaults(
  defineProps<
    PropsTransformations<NodeGroupingOptions<ND<typeof ogma>, ED<typeof ogma>>>
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
     * The options to pass to the grouping. See [NodeGroupingOptions](https://doc.linkurious.com/ogma/latest/api.html#NodeGroupingOptions)
     */
    options: () => ({
      selector: () => true,
      showContents: () => false,
      padding: () => 0,
      nodeGenerator: () => ({}),
      edgeGenerator: () => ({}),
      groupIdFunction: () => "",
    }),
  },
);
useTransformation<
  ND<typeof ogma>,
  ED<typeof ogma>,
  NodeGroupingOptions<ND<typeof ogma>, ED<typeof ogma>>,
  NodeGrouping<ND<typeof ogma>, ED<typeof ogma>>
>(props, (options) => ogma!.transformations.addNodeGrouping(options), emit);
</script>
<template></template>

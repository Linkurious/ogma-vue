<script setup lang="ts">
import Ogma from "@linkurious/ogma";
import type {
  NodeCollapsing,
  NodeCollapsingOptions,
} from "@linkurious/ogma/dev";
import { inject, withDefaults, defineProps, defineEmits } from "vue";
import {
  PropsTransformations,
  useTransformation,
} from "../../mixins/useTransformation";
import type { EmitType } from "../../mixins/useTransformation";
/**
 * Creates an NodeCollapsing tranformation
 * See [NodeCollapsing](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNodeCollapsing)
 * @displayName NodeCollapsing
 */
const ogma = inject<Ogma>("ogma")!;
type ND<C extends Ogma<any>> = C extends Ogma<infer T> ? T : unknown;
type ED<C extends Ogma<any, any>> = C extends Ogma<any, infer T> ? T : unknown;

const emit =
  defineEmits<EmitType<NodeCollapsing<ND<typeof ogma>, ED<typeof ogma>>>>();
const props = withDefaults(
  defineProps<
    PropsTransformations<
      NodeCollapsingOptions<ND<typeof ogma>, ED<typeof ogma>>
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
     * The options to pass to the collapser. See [NodeCollapsingOptions](https://doc.linkurious.com/ogma/latest/api.html#NodeCollapsingOptions)
     */
    options: () => ({
      edgeGenerator: () => ({}),
      selector: () => true,
    }),
  },
);
useTransformation<
  ND<typeof ogma>,
  ED<typeof ogma>,
  NodeCollapsingOptions<ND<typeof ogma>, ED<typeof ogma>>,
  NodeCollapsing<ND<typeof ogma>, ED<typeof ogma>>
>(props, (options) => ogma!.transformations.addNodeCollapsing(options), emit);
</script>
<template></template>

<script setup lang="ts">
import Ogma from "@linkurious/ogma";
import type {
  NeighborGeneration,
  NeighborGenerationOptions,
} from "@linkurious/ogma/dev";
import { inject, withDefaults, defineProps, defineEmits } from "vue";
import {
  PropsTransformations,
  useTransformation,
} from "../../mixins/useTransformation";
import type { EmitType } from "../../mixins/useTransformation";
/**
 * Creates an NeighborGeneration tranformation
 * See [NeighborGeneration](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNeighborGeneration)
 * @displayName NeighborGeneration
 */
const ogma = inject<Ogma>("ogma")!;
type ND<C extends Ogma<any>> = C extends Ogma<infer T> ? T : unknown;
type ED<C extends Ogma<any, any>> = C extends Ogma<any, infer T> ? T : unknown;

const emit =
  defineEmits<EmitType<NeighborGeneration<ND<typeof ogma>, ED<typeof ogma>>>>();
const props = withDefaults(
  defineProps<
    PropsTransformations<
      NeighborGenerationOptions<ND<typeof ogma>, ED<typeof ogma>>
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
     * The options to pass to the generator. See [NeighborGenerationOptions](https://doc.linkurious.com/ogma/latest/api.html#NeighborGenerationOptions)
     */
    options: () => ({
      selector: () => true,
      edgeGenerator: () => ({}),
      neighborIdFunction: () => "",
      nodeGenerator: () => ({}),
    }),
  },
);
useTransformation<
  ND<typeof ogma>,
  ED<typeof ogma>,
  NeighborGenerationOptions<ND<typeof ogma>, ED<typeof ogma>>,
  NeighborGeneration<ND<typeof ogma>, ED<typeof ogma>>
>(
  props,
  (options) => ogma!.transformations.addNeighborGeneration(options),
  emit,
);
</script>
<template></template>

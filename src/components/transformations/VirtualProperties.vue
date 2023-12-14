<script setup lang="ts">
import Ogma from "@linkurious/ogma";
import type {
  VirtualProperties,
  VirtualPropertiesOptions,
} from "@linkurious/ogma/dev";
import { inject, withDefaults, defineProps, defineEmits } from "vue";
import {
  PropsTransformations,
  useTransformation,
} from "../../mixins/useTransformation";
import type { EmitType } from "../../mixins/useTransformation";
/**
 * Creates an VirtualProperties tranformation
 * See [VirtualProperties](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addVirtualProperties)
 * @displayName VirtualProperties
 */

const ogma = inject<Ogma>("ogma")!;
type ND<C extends Ogma<any>> = C extends Ogma<infer T> ? T : unknown;
type ED<C extends Ogma<any, any>> = C extends Ogma<any, infer T> ? T : unknown;

const emit =
  defineEmits<EmitType<VirtualProperties<ND<typeof ogma>, ED<typeof ogma>>>>();
const props = withDefaults(
  defineProps<
    PropsTransformations<
      VirtualPropertiesOptions<ND<typeof ogma>, ED<typeof ogma>>
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
     * The options to pass to the transformation. See [VirtualPropertiesOptions](https://doc.linkurious.com/ogma/latest/api.html#VirtualPropertiesOptions)
     */
    options: () => ({
      edgeDataFunction: () => ({}),
      edgeSelector: () => true,
      nodeDataFunction: () => ({}),
      nodeSelector: () => true,
    }),
  },
);
useTransformation<
  ND<typeof ogma>,
  ED<typeof ogma>,
  VirtualPropertiesOptions<ND<typeof ogma>, ED<typeof ogma>>,
  VirtualProperties<ND<typeof ogma>, ED<typeof ogma>>
>(
  props,
  (options) => ogma!.transformations.addVirtualProperties(options),
  emit,
);
</script>
<template></template>

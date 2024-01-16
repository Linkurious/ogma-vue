<template></template>
<script setup lang="ts">
import type { DrawingFunction } from "@linkurious/ogma";
import { withDefaults, defineProps, ref } from "vue";
import { CanvasLayerProps, useLayer } from "../../hooks/useLayer";
const container = ref<HTMLDivElement>();
/**
 * Add a layer to Ogma. See [addLayer](https://doc.linkurio.us/ogma/latest/api.html#Ogma-layers-addLayer)
 * @displayName Layer
 */
const props = withDefaults(
  defineProps<{
    /**
     * wether canvas moves with the camera or not.[See](https://doc.linkurious.com/ogma/latest/api.html#CanvasLayerOptions)
     */
    isStatic?: boolean;
    /**
     * transparency
     */
    opacity?: number;
    /**
     * Should clear the canvas on new frame
     */
    noClear?: boolean;
    /**
     * Same as Layer.vue
     */
    level?: number;
    /**
     * Same as Layer.vue
     */
    visible?: boolean;
    /**
     * [Drawing function](https://doc.linkurio.us/ogma/latest/api.html#DrawingFunction)
     */
    render: DrawingFunction;
  }>(),
  {
    isStatic: false,
    noClear: false,
    opacity: 1,
    visible: true,
  },
);
useLayer("canvas", container, props as Required<CanvasLayerProps>);
</script>

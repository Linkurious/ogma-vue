<template>
  <div ref="container">
    <!-- @slot Use this slot to display your Layer -->
    <slot v-if="visible"></slot>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";
import type { Point } from "@linkurious/ogma";
import { defineProps, ref, watch } from "vue";
import { useLayer } from "../../mixins/useLayer";
const container = ref<HTMLDivElement>();
/**
 * Add a layer to Ogma. See [addLayer](https://doc.linkurio.us/ogma/latest/api.html#Ogma-layers-addLayer)
 * @displayName Layer
 */
const props = withDefaults(
  defineProps<{
    position: Point;
    size: { width: number; height: number };
    visible: boolean;
    level: number;
  }>(),
  {
    /**
     * The position of the overlay. See [OverlayOptions](https://doc.linkurio.us/ogma/latest/api.html#OverlayOptions)
     */
    position: () => ({ x: 0, y: 0 }),
    /**
     * The size of the overlay. See [OverlayOptions](https://doc.linkurio.us/ogma/latest/api.html#OverlayOptions)
     */
    size: () => ({ width: 0, height: 0 }),
    /**
     * CoWether the layer is visible or not. See [Layer show/hide](https://doc.linkurio.us/ogma/latest/api.html#Layer)
     */
    visible: true,
    /**
     * Level of the layer. See [Layer setLevel](https://doc.linkurio.us/ogma/latest/api.html#Layer)
     * Infinity and -Infinity triggers moveToTop and moveToBottom.
     */
    level: 0,
  }
);
const layer = useLayer("overlay", container, props);
watch([props.position], () => {
  if (!layer.value) return;
  layer.value.setPosition(props.position);
});
</script>
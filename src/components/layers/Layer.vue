<template>
  <div ref="container">
    <!-- @slot Put your layer here -->
    <slot v-if="visible" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { useLayer } from "../../hooks/useLayer";
const container = ref<HTMLDivElement>();
/**
 * Add a layer to Ogma. See [addLayer](https://doc.linkurio.us/ogma/latest/api.html#Ogma-layers-addLayer)
 * @displayName Layer
 */
const props = defineProps({
  /**
   * Wether the layer is visible or not. See [Layer show/hide](https://doc.linkurio.us/ogma/latest/api.html#Layer)
   */
  visible: { type: Boolean, default: true },
  /**
   * Level of the layer. See [Layer setLevel](https://doc.linkurio.us/ogma/latest/api.html#Layer)
   * Infinity and -Infinity triggers moveToTop and moveToBottom.
   */
  level: { type: Number, default: 0 },
});

const layer = useLayer("layer", container, props);
</script>

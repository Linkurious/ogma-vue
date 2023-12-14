<template>
  <div />
</template>
<script setup lang="ts">
import { defineEmits } from "vue";
/**
 * @displayName Test-CompoYAYA
 */
/**
 * @description Test component
 * Add a layer to Ogma. See [addLayer](https://doc.linkurio.us/ogma/latest/api.html#Ogma-layers-addLayer)
 */
const emits = defineEmits<{
  (e: "onNodesSelected"): string;
  /**
   * Emitted when nodes are selected
   */
  /**
   * Emitted when nodes are unselected
   */
  (event: "onNodesUnSelected"): string;
}>();
</script>

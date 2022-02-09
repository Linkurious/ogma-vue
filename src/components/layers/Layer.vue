<template>
  <div>
    <!-- @slot Use this slot to display your Layer -->
    <slot v-if="visible"></slot>
  </div>
</template>

<script>
import layerMixin from "../../mixins/LayerMixin";

/**
 * Add a layer to Ogma. See [addLayer](https://doc.linkurio.us/ogma/latest/api.html#Ogma-layers-addLayer)
 * @displayName Layer
 */
export default {
  name: "Layer",
  inject: ["ogma"],
  mixins: [layerMixin],
  methods: {
    createLayer() {
      this.layer = this.ogma.layers.addLayer(
        this.$el,
        this.index,
      );
    }
  },
};
</script>
<template>
  <div>
    <slot v-if="visible"></slot>
  </div>
</template>

<script>
import layerMixin from "../../mixins/LayerMixin";
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
<template>
  <div>
    <slot v-if="visible"></slot>
  </div>
</template>

<script>
import layerMixin from "../../mixins/LayerMixin";
export default {
  name: "Overlay",
  props: ["position", "size"],
  mixins: [layerMixin],
  watch: {
    position: {
      handler(newValue) {
        this.layer.setPosition(newValue);
      },
      deep: true
    }
  },
  methods: {
    createLayer() {
      this.layer = this.ogma.layers.addOverlay({
        element: this.$el,
        position: this.position,
        size: this.size
      });
    }
  },
};
</script>
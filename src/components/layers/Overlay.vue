<template>
  <div>
     <!-- @slot Use this slot to display your Overlay -->
    <slot v-if="visible"></slot>
  </div>
</template>

<script>
import layerMixin from "../../mixins/LayerMixin";


/**
 * Add an overlay to Ogma. See [addOverlay](https://doc.linkurio.us/ogma/latest/api.html#Ogma-layers-addOverlay)
 * @displayName Overlay
 */
export default {
  name: "Overlay",
  props: {
    /**
     * The position of the overlay. See [OverlayOptions](https://doc.linkurio.us/ogma/latest/api.html#OverlayOptions)
     */
    position: { type: Object, default: () => ({ x: 0, y: 0 }) },
    /**
     * The size of the overlay. See [OverlayOptions](https://doc.linkurio.us/ogma/latest/api.html#OverlayOptions)
     */
    size: { type: Object, default: () => ({ width: 0, height: 0 }) },
  },
  mixins: [layerMixin],
  watch: {
    position: {
      handler(newValue) {
        this.layer.setPosition(newValue);
      },
      deep: true,
    },
  },
  methods: {
    createLayer() {
      this.layer = this.ogma.layers.addOverlay({
        element: this.$el,
        position: this.position,
        size: this.size,
      });
    },
  },
};
</script>
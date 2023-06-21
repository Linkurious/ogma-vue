export default {
  name: "Layer",
  props: {
    /**
     * Wether the layer is visible or not. See [Layer show/hide](https://doc.linkurio.us/ogma/latest/api.html#Layer)
     */
    visible: { default: true },
    /**
     * Level of the layer. See [Layer setLevel](https://doc.linkurio.us/ogma/latest/api.html#Layer)
     * Infinity and -Infinity triggers moveToTop and moveToBottom.
     */
    level: { default: 0 },
  },
  inject: ["ogma"],
  data() {
    return {
      layer: null,
    };
  },
  watch: {
    level: function (newValue) {
      if (newValue === Infinity) {
        this.layer.moveToTop();
      } else if (newValue === -Infinity) {
        this.layer.moveToBottom();
      } else {
        this.layer.moveTo(newValue);
      }
    },
  },
  mounted() {
    if (this.layer) return;
    this.createLayer();
  },
  unmounted() {
    this.layer.destroy();
    this.layer = null;
  },
};

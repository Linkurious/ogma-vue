
export default {
  name: "Layer",
  props: {
    visible: { default: true },
    index: { default: 0 },
  },
  inject: ["ogma"],
  data() {
    return {
      layer: null
    };
  },
  watch: {
    index: function (newValue) {
      if (newValue === Infinity) {
        this.layer.moveToTop();
      } else if (value == -Infinity) {
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
  }
};

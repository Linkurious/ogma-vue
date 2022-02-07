<script>
import layerMixin from "../../mixins/LayerMixin";

export default {
  name: "CanvasLayer",
  mixins: [layerMixin],
  props: {
    options: { default: {} },
    opacity: { default: 1 },
    draw: { default: () => {} }
  },
  watch: {
    visible: function (newValue) {
      if (newValue) {
        this.layer.show();
      } else {
        this.layer.hide();
      }
    },
    opacity: function (newValue) {
      this.layer.setOpacity(newValue);
    },
    options: {
      handler() {
        this.layer.destroy();
        this.createLayer();
      }
    }
  },
  render() {
    return null;
  },
  methods: {
    createLayer() {
      this.layer = this.ogma.layers.addCanvasLayer(
        (ctx) => this.draw(ctx),
        this.options,
        this.index
      );
      this.layer.setOpacity(this.opacity);
      this.layer.moveTo(this.index);
      if (!this.visible) this.layer.hide();
    }
  }
};
</script>
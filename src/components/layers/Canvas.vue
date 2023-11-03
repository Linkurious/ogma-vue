<template>
  
</template>
<script setup lang="ts">
import { withDefaults } from "vue";
import type { DrawingFunction, Point } from "@linkurious/ogma";
import { defineProps, ref, watch } from "vue";
import { useLayer } from "../../mixins/LayerMixin";
const container = ref<HTMLDivElement>();
/**
 * Add a layer to Ogma. See [addLayer](https://doc.linkurio.us/ogma/latest/api.html#Ogma-layers-addLayer)
 * @displayName Layer
 */
const props = withDefaults(
  defineProps<{
    isStatic?: boolean;
    opacity?: number;
    noClear?: boolean;
    level?: number;
    visible?: boolean;
    render: DrawingFunction;
  }>(),
  {
    isStatic: false,
    noClear: false,
    opacity: 0.5,
    visible: true,
  }
);
const layer = useLayer("canvas", container, props);
watch([props], () => {
  if(!layer.value) return;
  layer.value.setOpacity(props.opacity);
});

// watch([props.position], () => {
//   if (!layer.value) return;
//   layer.value.setPosition(props.position);
// });

/*
// import layerMixin from "../../mixins/LayerMixin";

/**
 * Add a canvas layer to Ogma. See [addCanvasLayer](https://doc.linkurio.us/ogma/latest/api.html#Ogma-layers-addCanvasLayer)
 * @displayName CanvasLayer
 
 export default {
  name: "CanvasLayer",
  // mixins: [layerMixin],
  props: {
    /**
     * The options to pass to the creation of the layer. See [CanvasLayerOptions](https://doc.linkurio.us/ogma/latest/api.html#CanvasLayerOptions)
     
    options: { default: {} },
    /**
     * Opacity of the layer [0; 1]
     
    opacity: { default: 1 },
    /**
     * [Drawing function](https://doc.linkurio.us/ogma/latest/api.html#DrawingFunction)
     
    draw: { default: () => {} },
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
      },
    },
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
    },
  },
};
*/
</script>
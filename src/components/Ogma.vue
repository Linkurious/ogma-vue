<template>
  <div>
    <div class="ogma-container"></div>
    <slot></slot>
  </div>
</template>

<script>
import omgaEvents from "../mixins/OgmaEventsMixin.js";
import { provide } from "vue";
/**
 * Ogma vue component.
 * @displayName Ogma
 */
export default {
  name: "Ogma",
  props: {
    /**
     * The width of Ogma container
     */
    width: { type: Number, default: 512 },
    /**
     * The height of Ogma container
     */
    height: { type: Number, default: 512 },
    /**
     * The graph Ogma should render
     */
    graph: { type: Object, default: () => {} },
    /**
     * The instance of Ogma linked to the component
     */
    ogma: { type: Object, default: () => null },
  },
  setup(props) {
    provide("ogma", props.ogma);
  },
  watch: {
    graph(newGraph) {
      if (newGraph) {
        this.ogma.setGraph(newGraph);
      }
    },
    width(newWidth) {
      this.ogma.view.setSize({ width: newWidth, height: this.height });
    },
    height(newHeight) {
      this.ogma.view.setSize({ width: this.width, height: newHeight });
    },
  },
  mixins: [omgaEvents],
  mounted() {
    this.initOgma();
  },
  methods: {
    initOgma() {
      const container = this.$el.querySelector(".ogma-container");
      this.ogma.setContainer(container);
      this.ogma.view.setSize({ width: this.width, height: this.height });
      this.ogma.setGraph(this.graph).then(() => {
        this.ogma.layouts.force({ locate: true, duration: 0 });
      });
    },
  },
};
</script>

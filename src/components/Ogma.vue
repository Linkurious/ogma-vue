<template>
  <div>
    <div class="ogma-container"></div>
    <slot></slot>
  </div>
</template>

<script>
import omgaEvents from "../mixins/OgmaEventsMixin.js";
import { provide } from "vue";

export default {
  name: "Ogma",
  props: ["width", "height", "graph", "ogma"],
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
      console.log("width", newWidth, this.height);
      this.ogma.view.setSize({width: newWidth,height:  this.height});
    },
    height(newHeight) {
      console.log("height", this.width, newHeight);

      this.ogma.view.setSize({width: this.width, height: newHeight});
    }
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
    }
  }
};
</script>

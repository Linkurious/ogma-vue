```vue
<template>
  <div id="app">
    <OgmaVue 
      :ogma="ogma"
      :graph="graph"
      :width="width"
      :height="height"
      @nodesSelected="onNodesSelected"
    >
      <template>
        ... add you other components here (NodeGrouping, tools....)
        <StyleRule :options="rule" />
        ...
      </template>
    </OgmaVue>
  </div>
</template>

<script>
import {Ogma as OgmaVue, StyleRule } from "../../src/components/Ogma.vue";
import Ogma from "@linkurious/ogma";
const ogma = new Ogma();

export default {
  name: "App",
  data() {
    return {
      ogma,
      width: window.innerWidth,
      height: window.innerHeight,
      rule: {
        nodeAttributes: {
          color: "rgba(74, 160, 100, 1)",
        },
      },
      graph: {
        nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
        edges: [],
      },
    };
  },
  methods: {
    onNodesSelected({ nodes }) {
      console.log('nodes selected', nodes)
    },
  },
  components: {
    OgmaVue,
    StyleRule,
  },
};
</script>
```
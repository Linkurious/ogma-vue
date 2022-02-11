<template>
  <div>
    <h1>Ogma</h1>
    <OgmaVue
      :ogma="ogma"
      :graph="graph"
      :width="width"
      :height="height"
      @addNodes="onAddNodes"
      @nodesSelected="onNodesSelected"
    >
      <template>
        <StyleRule :rule="rule" />
        <Tooltip
          :visible="tooltip.visible"
          :size="tooltip.size"
          :position="tooltip.position"
        >
          <div class="tooltip">{{ tooltip.content }}</div>
        </Tooltip>
        <NodeGrouping
          :options="grouping.options"
          :events="grouping.events"
          @enabled="onGroupingEnabled"
        />
        <NodeFilter
          :options="filter.options"
          :events="filter.events"
          @enabled="onFilterEnabled"
        />
        <Canvas 
          :visible="canvas.visible"
          :draw="canvas.draw"
          :opacity="canvas.opacity"
          :index="canvas.index"
          :options="canvas.options"
        />
      </template>
    </OgmaVue>
    <div class="ui">
      <button
        @click="
          grouping.options = {
            ...grouping.options,
            enabled: !grouping.options.enabled
          }
        "
      >
        {{ grouping.options.enabled ? 'disable grouping' : 'enable grouping' }}
      </button>
      <button
        @click="
          filter.options = {
            ...filter.options,
            enabled: !filter.options.enabled
          }
        "
      >
        {{ filter.options.enabled ? 'disable filter' : 'enable filter' }}
      </button>
    </div>
  </div>
</template>

<script>
import OgmaVue from "../../src/components/Ogma.vue";
import StyleRule from "../../src/components/styles/StyleRule.vue";
import NodeGrouping from "../../src/components/transformations/NodeGrouping.vue";
import Tooltip from "../../src/components/layers/Overlay.vue";
import NodeFilter from "../../src/components/transformations/NodeFilter.vue";
import Canvas from "../../src/components/layers/Canvas.vue";

import Ogma from "@linkurious/ogma";

const ogma = new Ogma();

export default {
  name: "App",
  data() {
    return {
      ogma,
      width: window.innerWidth/2,
      height: (window.innerHeight - +(this.$el && this.offsetTop))/2,
      canvas: {
        draw: (ctx) => {
          const node = ogma.getNodes().get(4);
          if(!node)return;
          const pos =  node.getPosition(); 
          ctx.fillRect(pos.x,pos.y, 10, 10)
        },
        opacity: 1,
        index: 1,
        options: {}
      },
      rule: {
        nodeSelector: () => true,
        nodeAttributes: {
          color: "blue"
        }
      },
      grouping: {
        options: {
          nodeSelector: () => true,
          duration: 1000,
          groupIdFunction: (node) => node.getId() % 2,
          showContents: true,
          enabled: false
        },
        events: ["enabled", "destroyed"]
      },
      filter: {
        options: {
          selector: (node) => node.getId() % 2,
          duration: 1000,
          enabled: false
        },
        events: ["enabled", "destroyed"]
      },
      tooltip: {
        visible: false,
        position: {
          x: 0,
          y: 0
        },
        size: {
          width: 0,
          height: 0
        },
        content: ""
      },
      graph: {
        nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
        edges: []
      }
    };
  },
  mounted(){
    window.addEventListener("resize", this.onResize);
    window.ogma = ogma;
    // setTimeout(() => {
    //   this.canvas = {
    //     ...this.canvas,
    //     options: {noClear: true},
    //   };
    //   console.log({...this.canvas});
    // }, 100)

        setTimeout(() => {
      this.canvas = {
        ...this.canvas,
        opacity: 0.5
      };
    }, 3000)
  },
  methods: {
    onGroupingEnabled(grouping) {
      console.log("grouping enabled", grouping);
    },
    onFilterEnabled(filter) {
      console.log("filter enabled", filter);
    },
    onNodesSelected({ nodes })  {
      this.tooltip = {
        ...this.tooltip,
        position: {
          x:
            nodes.get(0).getAttribute("x") +
            5 +
            nodes.get(0).getAttribute("radius"),
          y: nodes.get(0).getAttribute("y")
        },
        content: `${nodes.get(0).getId()} is selected`,
        visible: true
      };
    },
    onResize(){
      this.width = window.innerWidth /2;
      this.height = (
        window.innerHeight - +(this.$el && this.offsetTop))/2;
    }
  },
  components: {
    OgmaVue,
    StyleRule,
    NodeGrouping,
    NodeFilter,
    Tooltip,
    Canvas
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>


<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-around;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  overflow: hidden;
}
body {
  /* overflow: hidden; */
}
#app canvas { 
  border: 1px solid red;
}
.tooltip {
  background-color: #ddd;
  border-radius: 1px;
  padding: 2px;
  font-size: 2px;
}
</style>

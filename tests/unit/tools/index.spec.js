import { expect } from "chai"
import { createWrapper } from "../utils"
import Ogma from "@linkurious/ogma"
import ConnectNodes from "@/components/tools/ConnectNodes.vue";
import Lasso from "@/components/tools/Lasso.vue";
import Legend from "@/components/tools/Legend.vue";
import Rewire from "@/components/tools/Rewire.vue";
import Snapping from "@/components/tools/Snapping.vue";


import { nextTick } from "vue";

let ogma, graph, wrapper;

const toolsToTest = [
  {
    component: ConnectNodes,
    tool: "connectNodes",
    name: "ConnectNodes.vue",
  },
  {
    component: Lasso,
    tool: "lasso",
    name: "Lasso.vue",
  },
  {
    component: Legend,
    tool: "legend",
    name: "Legend.vue",
  },
  {
    component: Rewire,
    tool: "rewire",
    name: "Rewire.vue",
  },
  {
    component: Snapping,
    tool: "snapping",
    name: "Snapping.vue",
  },
]

toolsToTest.forEach(({ component, tool, name }) => {
  const mount = createWrapper(component, { enabled: false });
  describe(name, () => {
    beforeEach(() => {
      graph = {
        nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
        edges: [{ id: 0, source: 0, target: 1 }, { id: 1, source: 1, target: 2 }, { id: 2, source: 2, target: 3 }]
      }
      ogma = new Ogma({ renderer: "canvas", graph });
    })
    afterEach(() => {
      if (wrapper) {
        wrapper.unmount();
      }
    })
    it("should enable the tool", () => {
      wrapper = mount(ogma, { enabled: true })
      expect(ogma.tools[tool].enabled()).to.equal(true)
    });

    it("should be reactive to props change", () => {
      wrapper = mount(ogma, {
        enabled: true
      })
      expect(ogma.tools[tool].enabled()).to.equal(true)
      wrapper.setProps({
        enabled: false
      })
      return nextTick().then(() => {
        expect(ogma.tools[tool].enabled()).to.equal(false)
      })
    });
  });
});


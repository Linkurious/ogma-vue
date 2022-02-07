import { expect } from "chai"
import { mount } from "@vue/test-utils"
import OgmaVue from "@/components/Ogma.vue"
import Ogma from "@linkurious/ogma"
import { nextTick } from "vue"

let ogma, graph;
describe("Ogma.vue", () => {
  beforeEach(() => {
    ogma = new Ogma({renderer: "canvas"});
    graph = {
      nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
      edges: [{ id: 0, source: 0, target: 1 }, { id: 1, source: 1, target: 2 }, { id: 2, source: 2, target: 3 }]
    }
  })
  it("should instanciate ogma and render the graph", () => {
    mount(OgmaVue, {
      props: { ogma, graph, width: 128, height: 128 },
    })
    ogma.events.once("resize", () => {
      expect(ogma.getNodes().size).to.equal(4)
      expect(ogma.getEdges().size).to.equal(3)
      expect(ogma.view.getSize()).to.deep.equal({ width: 256, height: 256 })
    })
  });

  it("should register ogma events and trigger them", () => {
    const wrapper = mount(OgmaVue, {
      props: { ogma, graph, width: 128, height: 128 },
    })
    expect(wrapper.emitted()).to.have.property("addNodes");
    expect(wrapper.emitted()).to.have.property("addEdges");
  });
  it("should trigger only specified events", () => {
    const wrapper = mount(OgmaVue, {
      props: {
        ogma, graph, width: 128, height: 128,
        events: ["addNodes"]
      },
    })
    expect(wrapper.emitted()).to.have.property("addNodes");
    expect(wrapper.emitted()).to.not.have.property("addEdges");
  });
  it("should trigger only specified events", () => {
    const wrapper = mount(OgmaVue, {
      props: {
        ogma, graph, width: 128, height: 128,
        events: ["addNodes"]
      },
    })
    expect(wrapper.emitted()).to.have.property("addNodes");
    expect(wrapper.emitted()).to.not.have.property("addEdges");
  });
  it("should be reactive to graph change", () => {
    const wrapper = mount(OgmaVue, {
      props: { ogma, graph, width: 128, height: 128 }
    })
    wrapper.setProps({
      graph: {
        nodes: graph.nodes.slice(1),
        edges: graph.edges.slice(1),

      }
    })
    return nextTick()
      .then(() => {
        expect(ogma.getNodes().size).to.be.equal(graph.nodes.length - 1)
        expect(ogma.getEdges().size).to.be.equal(graph.edges.length - 1)
      })
  });
})

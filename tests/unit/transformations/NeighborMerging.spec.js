import { expect } from "chai"
import { createWrapper } from "../utils"
import Ogma from "@linkurious/ogma"
import NeighborMerging from "@/components/transformations/NeighborMerging.vue";
const mountNeighborMerging = createWrapper(NeighborMerging, { params: { duration: 0, enabled: false } });

let ogma, graph, wrapper;
describe("NeighborMerging.vue", () => {
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

  it("should create a transformation", () => {
    wrapper = mountNeighborMerging(ogma)
    expect(ogma.transformations.getList().length).to.equal(1)
  });

  it("should respect passed options to transformation", () => {
    wrapper = mountNeighborMerging(ogma, {
      params: {
        duration: 1000,
        enabled: false
      }
    })
    const transformation = ogma.transformations.getList()[0];
    expect(transformation.getDuration()).to.equal(1000);
    expect(transformation.isEnabled()).to.equal(false);
  });

  it("should be reactive to props change", () => {
    wrapper = mountNeighborMerging(ogma, {
      params: {
        selector: (node) => node.getId() === 1,
        duration: 10,
        enabled: true
      }
    })
    const transformation = ogma.transformations.getList()[0];
    return transformation.whenApplied().then(() => {
      expect(ogma.getNodes().size).to.equal(3);

      wrapper.setProps({
        params: {
          selector: () => false,
          duration: 20,
          enabled: true,
        }
      })
      return transformation.whenApplied()
    })
      .then(() => {
        expect(transformation.getDuration()).to.equal(20);
        expect(transformation.isEnabled()).to.equal(true);
        // this needs annnother version of Ogma: for now we cant update the function
        // expect(ogma.getEdges().filter(n => n.isVirtual()).size).to.equal(0);
      })
  });

  it("should destroy the transformation on detroy", (done) => {
    wrapper = mountNeighborMerging(ogma);
    wrapper.unmount();
    wrapper = null;
    new Promise(() => {
      setTimeout(() => {
        // seems like tere is no other option: nextTick or ogma.view.afterNextFrame
        // timeouts.
        expect(ogma.transformations.getList().length).to.equal(0);
        done();
      }, 200)
    });
  });
})
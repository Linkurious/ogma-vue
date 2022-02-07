import { expect } from "chai"
import { mount } from "@vue/test-utils"
import Ogma from "@linkurious/ogma"
import StyleClass from "@/components/styles/StyleClass.vue";

let ogma, graph, wrapper;
describe("StyleClass.vue", () => {
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

  it("should create a style class", () => {
    wrapper = mount(StyleClass, {
      props: {
        options: {
          name: "test",
        }
      },
      global: {
        provide: {
          ogma: ogma
        },
      }
    })
    expect(ogma.styles.getClassList().length).to.equal(1)
  });

  it("should respect passed options", () => {
    wrapper = mount(StyleClass, {
      props: {
        edges: ogma.getNodes().slice(0, 1),
        nodes: ogma.getEdges().slice(0, 1),
        options: {
          name: "test",
          edgeAttributes: {
            color: "red",
          },
          nodeAttributes: {
            color: "red",
          }
        }
      },
      global: {
        provide: {
          ogma: ogma
        },
      }
    })
    return ogma.view.afterNextFrame()
      .then(() => {
        const nodeColors = ogma.getNodes().getAttribute("color");
        expect(nodeColors).to.have.same.members(["red", "grey", "grey", "grey"]);
        const edgeColors = ogma.getNodes().getAttribute("color");
        expect(edgeColors).to.have.same.members(["red", "grey", "grey", "grey"]);
      })
  });

  it("should be reactive to props change", () => {
    wrapper = mount(StyleClass, {
      props: {
        edges: ogma.getNodes().slice(0, 1),
        nodes: ogma.getEdges().slice(0, 1),
        options: {
          name: "test",
          edgeAttributes: {
            color: "red",
          },
          nodeAttributes: {
            color: "red",
          }
        }
      },
      global: {
        provide: {
          ogma: ogma
        },
      }
    })
    return new Promise((resolve) => {
      wrapper.setProps({
        edges: ogma.getNodes().slice(1, 2),
        nodes: ogma.getEdges().slice(1, 2),
        options: {
          name: "test",
          nodeAttributes: {
            color: "green",
          },
          edgeAttributes: {
            color: "green",
          },
        }
      })
      resolve();
    })
      .then(() => new Promise(resolve => {
        setTimeout(() => {
          const nodeColors = ogma.getNodes().getAttribute("color");
          expect(nodeColors).to.have.same.members(["grey", "green", "grey", "grey"]);
          const edgeColors = ogma.getNodes().getAttribute("color");
          expect(edgeColors).to.have.same.members(["grey", "green", "grey", "grey"]);
          resolve()
        }, 200)
      })
      )
  });

  it("should destroy the class on detroy", (done) => {
    wrapper = mount(StyleClass, {
      props: {
        options: {
          name: "test",
        }
      },
      global: {
        provide: {
          ogma: ogma
        },
      }
    })
    wrapper.unmount();
    wrapper = null;
    new Promise(() => {
      setTimeout(() => {
        // seems like tere is no other option: nextTick or ogma.view.afterNextFrame
        // timeouts.
        expect(ogma.styles.getRuleList().length).to.equal(0);
        done();
      }, 200)
    });
  });
})

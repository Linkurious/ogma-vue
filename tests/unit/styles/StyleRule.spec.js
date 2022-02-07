import { expect } from "chai"
import { mount } from "@vue/test-utils"
import Ogma from "@linkurious/ogma"
import StyleRule from "@/components/styles/StyleRule.vue";

let ogma, graph, wrapper;
describe("StyleRule.vue", () => {
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

  it("should create a style rule", () => {
    wrapper = mount(StyleRule, {
      props: {},
      global: {
        provide: {
          ogma: ogma
        },
      }
    })
    expect(ogma.styles.getRuleList().length).to.equal(1)
  });

  it("should respect passed options", () => {
    wrapper = mount(StyleRule, {
      props: {
        options: {
          edgeSelector: edge => edge.getId() === 0,
          nodeSelector: e => e.getId() === 0,
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
    wrapper = mount(StyleRule, {
      props: {
        options: {
          selector: e => e.getId() === 0,
          rule: {
            color: "red",
          },
        }
      },
      global: {
        provide: {
          ogma: ogma
        },
      }
    })
    return new Promise((resolve) => {
      setTimeout(() => {
        wrapper.setProps({
          options: {
            nodeSelector: e => e.getId() === 1,
            edgeSelector: e => e.getId() === 1,
            nodeAttributes: {
              color: "green",
            },
            edgeAttributes: {
              color: "green",
            },
          }
        })
        resolve();
      }, 200)
    })
      .then(() => {
        return new Promise(resolve => {
          setTimeout(() => {
            const nodeColors = ogma.getNodes().getAttribute("color");
            expect(nodeColors).to.have.same.members(["grey", "green", "grey", "grey"]);
            const edgeColors = ogma.getNodes().getAttribute("color");
            expect(edgeColors).to.have.same.members(["grey", "green", "grey", "grey"]);
            resolve()
          }, 200)
        })
      })
  });

  it("should destroy the rule on detroy", (done) => {
    wrapper = mount(StyleRule, {
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

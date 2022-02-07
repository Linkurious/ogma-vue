import { expect } from "chai"
import { mount } from "@vue/test-utils"
import Ogma from "@linkurious/ogma"
import NodeRule from "@/components/styles/NodeRule.vue";

let ogma, graph, wrapper;
describe("NodeRule.vue", () => {
  beforeEach(() => {
    graph = {
      nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
      Nodes: [{ id: 0, source: 0, target: 1 }, { id: 1, source: 1, target: 2 }, { id: 2, source: 2, target: 3 }]
    }
    ogma = new Ogma({ renderer: "canvas", graph });
  })
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  })

  it("should create a style rule", () => {
    wrapper = mount(NodeRule, {
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
    wrapper = mount(NodeRule, {
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
    return ogma.view.afterNextFrame()
      .then(() => {
        const colors = ogma.getNodes().getAttribute("color");
        expect(colors).to.have.same.members(["red", "grey", "grey", "grey"]);
      })
  });

  it("should be reactive to props change", () => {
    wrapper = mount(NodeRule, {
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
            selector: e => e.getId() === 1,
            rule: {
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
            const colors = ogma.getNodes().getAttribute("color");
            expect(colors).to.have.same.members(["grey", "green", "grey", "grey"]);
            resolve()
          }, 200)
        })
      })
  });

  it("should destroy the rule on detroy", (done) => {
    wrapper = mount(NodeRule, {
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

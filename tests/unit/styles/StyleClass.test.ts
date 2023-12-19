import Ogma from "@linkurious/ogma";
import { describe, beforeEach, afterEach, it, expect } from "vitest";
import { StyleClass } from "../../../src/components";
import { StyleClassProps } from "../../../src/hooks";
import { createWrapper } from "../utils";

let ogma: Ogma;
let graph;
const mountRule = createWrapper<StyleClassProps>(StyleClass, {
  props: {
    name: 'test-class',
  },
  global: {
    provide: {
      ogma
    },
  }
});
let wrapper: ReturnType<typeof mountRule>;
describe("StyleClass.vue", () => {
  beforeEach(() => {
    graph = {
      nodes: [{ id: 0 }, { id: 1 }, { id: 2 }],
      edges: [{ id: 0, source: 0, target: 1 }, { id: 1, source: 1, target: 2 }]
    };
    ogma = new Ogma({ renderer: "canvas", graph });
  });
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
    ogma.destroy();

  });

  it("should create a style class", () => {
    wrapper = mountRule(ogma, {
      name: "test",
    });
    expect(ogma.styles.getClassList().length).to.equal(1);
  });

  it("should respect passed options", () => {
    wrapper = mountRule(ogma, {
      nodes: ogma.getNodes().slice(0, 1),
      edges: ogma.getEdges().slice(0, 1),
      nodes: ogma.getNodes(),
      edges: ogma.getEdges(),
      name: "test-1",
      edgeAttributes: {
        color: "red",
      },
      nodeAttributes: {
        color: "red",
      }
    });
    return ogma.view.afterNextFrame()
      .then(() => {
        const nodeColors = ogma.getNodes().getAttribute("color");
        expect(nodeColors).to.have.same.members(["red", "red", "red"]);
        const edgeColors = ogma.getNodes().getAttribute("color");
        expect(edgeColors).to.have.same.members(["red", "red", "red"]);
      });
  });

  it('Should add/remove nodes and edges', () => {
    wrapper = mountRule(ogma, {
      nodes: ogma.getNodes().slice(0, 1),
      edges: ogma.getEdges().slice(0, 1),
      name: "test-11",
      edgeAttributes: {
        color: "red",
      },
      nodeAttributes: {
        color: "red",
      }
    });
    return ogma.view.afterNextFrame()
      .then(() => {
        wrapper.setProps({
          nodes: ogma.getNodes().slice(1),
          edges: ogma.getEdges().slice(1),
        });
        return ogma.view.afterNextFrame()
          .then(() => ogma.view.afterNextFrame());
      })
      .then(() => {
        const nodeColors = ogma.getNodes().getAttribute("color");
        expect(nodeColors).to.have.same.members(["grey", "red", "red"]);
        const edgeColors = ogma.getNodes().getAttribute("color");
        expect(edgeColors).to.have.same.members(["grey", "red", "red"]);
        wrapper.setProps({
          nodes: ogma.getNodes().slice(1, 2),
          edges: ogma.getEdges().slice(1, 2),
        });
        return ogma.view.afterNextFrame();

      })
      .then(() => {
        const nodeColors = ogma.getNodes().getAttribute("color");
        expect(nodeColors).to.have.same.members(["grey", "red", "grey"]);
        const edgeColors = ogma.getNodes().getAttribute("color");
        expect(edgeColors).to.have.same.members(["grey", "red", "grey"]);
      });
  });

  it("should be reactive to attributes change", () => {
    wrapper = mountRule(ogma, {
      nodes: ogma.getNodes().slice(0, 1),
      edges: ogma.getEdges().slice(0, 1),
      name: "test",
      edgeAttributes: {
        color: "red",
      },
      nodeAttributes: {
        color: "red",
      }
    });
    return ogma.view.afterNextFrame()
      .then(() => {
        wrapper.setProps({
          nodeAttributes: {
            color: "green",
          },
          edgeAttributes: {
            color: "green",
          },
        });
        return ogma.view.afterNextFrame();
      })
      .then(() => {
        const nodeColors = ogma.getNodes().getAttribute("color");
        expect(nodeColors).to.have.same.members(["green", "grey", "grey"]);
        const edgeColors = ogma.getNodes().getAttribute("color");
        expect(edgeColors).to.have.same.members(["green", "grey", "grey"]);
      });
  });

  it("should destroy the rule on detroy", () => {
    wrapper = mountRule(ogma);
    wrapper.unmount();
    wrapper = null;
    // seems like tere is no other option: nextTick or ogma.view.afterNextFrame
    // timeouts.
    return new Promise((resolve) => setTimeout(resolve, 200))
      .then(() =>
        expect(ogma.styles.getRuleList().length).to.equal(0)
      );
  });
});

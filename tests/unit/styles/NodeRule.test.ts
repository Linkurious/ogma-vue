import Ogma from "@linkurious/ogma";
import { describe, beforeEach, afterEach, it, expect } from "vitest";
import { NodeRule } from "../../../src/components";
import { NodeRuleProps } from "../../../src/hooks";
import { createWrapper } from "../utils";

let ogma: Ogma;
let graph;
const mountRule = createWrapper<NodeRuleProps>(NodeRule, {
  props: {
  },
  global: {
    provide: {
      ogma
    },
  }
});
let wrapper: ReturnType<typeof mountRule>;
describe("NodeRule.vue", () => {
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
  });

  it("should create a style rule", () => {
    wrapper = mountRule(ogma, {});
    expect(ogma.styles.getRuleList().length).to.equal(1);
  });

  it("should respect passed options", () => {
    wrapper = mountRule(ogma, {
      selector: e => e.getId() === 0,
      nodeAttributes: {
        color: "red",
      },
    },
    );
    return ogma.view.afterNextFrame()
      .then(() => {
        const colors = ogma.getNodes().getAttribute("color");
        expect(colors).to.have.same.members(["red", "grey", "grey"]);
      });
  });

  it("should be update on selector change", () => {
    wrapper = mountRule(ogma, {
      selector: e => e.getId() === 0,
      nodeAttributes: {
        color: "red",
      },
    });
    return ogma.view.afterNextFrame()
      .then(() => {
        const colors = ogma.getNodes().getAttribute("color");
        expect(colors).to.have.same.members(["red", "grey", "grey"]);
        wrapper.setProps({
          selector: e => e.getId() === 1,
        });
        return ogma.view.afterNextFrame();
      })
      .then(() => {
        const colors = ogma.getNodes().getAttribute("color");
        expect(colors).to.have.same.members(["grey", "red", "grey"]);
      });
  });

  it("should be update on selector attributes", () => {
    wrapper = mountRule(ogma, {
      selector: e => e.getId() === 0,
      nodeAttributes: {
        color: "red",
      },
    });
    return ogma.view.afterNextFrame()
      .then(() => {
        const colors = ogma.getNodes().getAttribute("color");
        expect(colors).to.have.same.members(["red", "grey", "grey"]);
        wrapper.setProps({
          nodeAttributes: {
            color: "blue",
          },
        });
        return ogma.view.afterNextFrame();
      })
      .then(() => {
        const colors = ogma.getNodes().getAttribute("color");
        expect(colors).to.have.same.members(["blue", "grey", "grey"]);
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

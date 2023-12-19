import Ogma from "@linkurious/ogma";
import { describe, beforeEach, afterEach, it, expect } from "vitest";
import { EdgeRule } from "../../../src/components";
import { EdgeRuleProps } from "../../../src/hooks";
import { createWrapper } from "../utils";

let ogma: Ogma;
let graph;
const mountRule = createWrapper<EdgeRuleProps>(EdgeRule, {
  props: {

  },
  global: {
    provide: {
      ogma
    },
  }
});
let wrapper: ReturnType<typeof mountRule>;
describe("EdgeRule.vue", () => {
  beforeEach(() => {
    graph = {
      nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
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
      edgeAttributes: {
        color: "red",
      },
    },
    );
    return ogma.view.afterNextFrame()
      .then(() => {
        const colors = ogma.getEdges().getAttribute("color");
        expect(colors).to.have.same.members(["red", "grey"]);
      });
  });

  it("should be update on selector change", () => {
    wrapper = mountRule(ogma, {
      selector: e => e.getId() === 0,
      edgeAttributes: {
        color: "red",
      },
    });
    return ogma.view.afterNextFrame()
      .then(() => {
        const colors = ogma.getEdges().getAttribute("color");
        expect(colors).to.have.same.members(["red", "grey"]);
        wrapper.setProps({
          selector: e => e.getId() === 1,
        });
        return ogma.view.afterNextFrame();
      })
      .then(() => {
        const colors = ogma.getEdges().getAttribute("color");
        expect(colors).to.have.same.members(["red", "grey"]);

      });
  });

  it("should be update on selector attributes", () => {
    wrapper = mountRule(ogma, {
      selector: e => e.getId() === 0,
      edgeAttributes: {
        color: "red",
      },
    });
    return ogma.view.afterNextFrame()
      .then(() => {
        const colors = ogma.getEdges().getAttribute("color");
        expect(colors).to.have.same.members(["red", "grey"]);
        wrapper.setProps({
          edgeAttributes: {
            color: "blue",
          },
        });
        return ogma.view.afterNextFrame();
      })
      .then(() => {
        const colors = ogma.getEdges().getAttribute("color");
        expect(colors).to.have.same.members(["blue", "grey"]);
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

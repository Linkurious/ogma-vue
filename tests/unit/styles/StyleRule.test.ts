import Ogma from "@linkurious/ogma";
import { describe, beforeEach, afterEach, it, expect } from "vitest";
import { StyleRule } from "../../../src/components";
import { StyleRuleProps } from "../../../src/hooks";
import { createWrapper } from "../utils";

let ogma: Ogma;
let graph;
const mountRule = createWrapper<StyleRuleProps>(StyleRule, {});
let wrapper: ReturnType<typeof mountRule>;
describe("StyleRule.vue", () => {
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

  it("should create a style rule", () => {
    wrapper = mountRule(ogma, {});
    expect(ogma.styles.getRuleList().length).to.equal(1);
  });

  it("should respect passed options", () => {
    wrapper = mountRule(ogma, {
      nodeSelector: e => e.getId() === 0,
      edgeSelector: e => e.getId() === 0,
      nodeAttributes: {
        color: "red",
      },
      edgeAttributes: {
        color: "red"
      }
    },
    );
    return ogma.view.afterNextFrame()
      .then(() => {
        expect(ogma.getNodes().getAttribute("color")).to.have.same.members(["red", "grey", "grey"]);
        expect(ogma.getEdges().getAttribute("color")).to.have.same.members(["red", "grey"]);
      });
  });

  it("should be update on selector change", () => {
    wrapper = mountRule(ogma, {
      nodeSelector: e => e.getId() === 0,
      edgeSelector: e => e.getId() === 0,
      nodeAttributes: {
        color: "red",
      },
      edgeAttributes: {
        color: "red",
      },
    });
    return ogma.view.afterNextFrame()
      .then(() => {
        expect(ogma.getNodes().getAttribute("color")).to.have.same.members(["red", "grey", "grey"]);
        expect(ogma.getEdges().getAttribute("color")).to.have.same.members(["red", "grey"]);
        wrapper.setProps({
          nodeSelector: e => e.getId() === 1,
          edgeSelector: e => e.getId() === 1,
        });
        return ogma.view.afterNextFrame();
      })
      .then(() => {
        expect(ogma.getNodes().getAttribute("color")).to.have.same.members(["grey", "red", "grey"]);
        expect(ogma.getEdges().getAttribute("color")).to.have.same.members(["grey", "red"]);
      });
  });

  it("should be update on attributes change", () => {
    wrapper = mountRule(ogma, {
      nodeSelector: e => e.getId() === 0,
      edgeSelector: e => e.getId() === 0,
      nodeAttributes: {
        color: "red",
      },
      edgeAttributes: {
        color: "red",
      },
    });
    return ogma.view.afterNextFrame()
      .then(() => {
        expect(ogma.getNodes().getAttribute("color"))
          .to.have.same.members(["red", "grey", "grey"]);
        expect(ogma.getEdges().getAttribute("color"))
          .to.have.same.members(["red", "grey"]);
        wrapper.setProps({
          nodeAttributes: {
            color: "blue",
          },
          edgeAttributes: {
            color: "blue",
          },
        });
        return ogma.view.afterNextFrame();
      })
      .then(() => {
        expect(ogma.getNodes().getAttribute("color"))
          .to.have.same.members(["blue", "grey", "grey"]);
        expect(ogma.getEdges().getAttribute("color"))
          .to.have.same.members(["blue", "grey"]);

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

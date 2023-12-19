import Ogma from "@linkurious/ogma";
import { describe, beforeEach, afterEach, it, expect } from "vitest";
import { EdgeFilter } from "../../../src/components";
import { EdgeFilterProps } from "../../../src/hooks";
import { createWrapper } from "../utils";

let ogma: Ogma;
let graph;
const mountEdgeFilter = createWrapper<EdgeFilterProps>(EdgeFilter, {});
let wrapper: ReturnType<typeof mountEdgeFilter>;
describe("EdgeFilter.vue", () => {
  beforeEach(() => {
    graph = {
      nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
      edges: [{ id: 0, source: 0, target: 1 }, { id: 1, source: 1, target: 2 }, { id: 2, source: 2, target: 3 }]
    };
    ogma = new Ogma({ renderer: "canvas", graph });
  });
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
    ogma.destroy();
  });

  it("should create a transformation", () => {
    wrapper = mountEdgeFilter(ogma);
    expect(ogma.transformations.getList().length).to.equal(1);
  });

  it("should respect passed options to transformation", () => {
    wrapper = mountEdgeFilter(ogma, {
      duration: 10,
      enabled: false
    });
    const transformation = ogma.transformations.getList()[0];
    expect(transformation.isEnabled()).to.equal(false);
  });

  it("should be reactive to props change", () => {
    wrapper = mountEdgeFilter(ogma, {
      duration: 10,
      enabled: true,
      options: {
        criteria: () => true,
      }
    });
    const transformation = ogma.transformations.getList()[0];
    return transformation.whenApplied().then(() => {
      expect(ogma.getEdges().size).to.equal(3);
      wrapper.setProps({
        options: {
          criteria: () => false,
        }
      });
    })
      .then(() => ogma.transformations.afterNextUpdate())
      .then(() => {
        expect(transformation.isEnabled()).to.equal(true);
        expect(ogma.getEdges().size).to.equal(0);
      });
  });

  it("should destroy the transformation on detroy", () => {
    wrapper = mountEdgeFilter(ogma);
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
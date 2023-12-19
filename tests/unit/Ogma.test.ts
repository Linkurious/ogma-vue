import Ogma from "@linkurious/ogma";
import { describe, beforeEach, afterEach, it, expect } from "vitest";
// import { useOgma } from "../../../src/components";
import { OgmaProps, useOgma } from "../../src/hooks";
import { mount } from "@vue/test-utils";
import { VueElement, nextTick } from "vue";

let ogma: Ogma;
describe("Ogma.vue", () => {
  beforeEach(() => {
    ogma = new Ogma({ renderer: "canvas" });
    // graph = {
    //   nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
    //   edges: [{ id: 0, source: 0, target: 1 }, { id: 1, source: 1, target: 2 }, { id: 2, source: 2, target: 3 }]
    // };
  });
  it("should instanciate ogma and render the graph", () => {
    mount(useOgma(ogma), {
      props: { width: 128, height: 128 },
    });
    ogma.events.once("resize", () => {
      expect(ogma.getNodes().size).to.equal(4);
      expect(ogma.getEdges().size).to.equal(3);
      expect(ogma.view.getSize()).to.deep.equal({ width: 256, height: 256 });
    });
  });

  it("should register ogma events and trigger them", () => {
    const wrapper = mount(useOgma(ogma), {
      props: { ogma, width: 128, height: 128 },
    });

    wrapper.setProps({
      graph: {
        nodes: [{ id: 0 }],
        edges: [{ id: 1, source: 0, target: 0 }]
      }
    });
    return ogma.view.afterNextFrame()
      .then(() => {
        expect(wrapper.emitted()).to.have.property("addNodes");
        expect(wrapper.emitted()).to.have.property("addEdges");
      });
  });
  it("should trigger only specified events", () => {
    const wrapper = mount(useOgma(ogma), {
      props: {
        width: 128, height: 128,
        events: ["addNodes"]
      },
    });
    wrapper.setProps({
      graph: {
        nodes: [{ id: 0 }],
        edges: [{ id: 1, source: 0, target: 0 }]
      }
    });
    return ogma.view.afterNextFrame()
      .then(() => {
        expect(wrapper.emitted()).to.have.property("addNodes");
        expect(wrapper.emitted()).to.not.have.property("addEdges");
      });
  });
  it("should be reactive to graph change", () => {
    const graph = {
      nodes: [{ id: 0 }],
      edges: [{ id: 1, source: 0, target: 0 }]
    };

    const wrapper = mount(useOgma(ogma), {
      props: {
        graph,
        width: 128, height: 128
      }
    });
    wrapper.setProps({
      graph: {
        nodes: graph.nodes.concat({ id: 2 }),
        edges: graph.edges.concat({ id: 2, source: 0, target: 2 }),

      }
    });
    return nextTick()
      .then(() => {
        expect(ogma.getNodes().size).toBe(2);
        expect(ogma.getEdges().size).toBe(2);
      });
  });
  it("Should destroy on unmount", () => {
    const wrapper = mount(useOgma(ogma), {
      props: {
        width: 128, height: 128,
        events: ["addNodes"]
      },
    });
    wrapper.unmount();
    nextTick()
      .then(() => {
        expect(ogma.isDestroyed()).toBe(true);
      });
  });
});

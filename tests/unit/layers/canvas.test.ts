import Ogma from "@linkurious/ogma";
import { describe, beforeEach, afterEach, it, expect } from "vitest";
import Canvas from "../../../src/components/layers/Canvas.vue";
import { CanvasLayerProps } from "../../../src/hooks/useLayer";
import { createWrapper } from "../utils";

let ogma: Ogma;
let graph;
let render: string[] = [];
const mountLayer = createWrapper<CanvasLayerProps>(Canvas, {
  props: {
    visible: true,
    level: 1,
    render: () => {
      render.push('default');
    },
    isStatic: false,
    noClear: false,
  },
  global: {
    provide: {
      ogma
    },
  }
});
let wrapper: ReturnType<typeof mountLayer>;

describe("Canvas.vue", () => {
  beforeEach(() => {
    graph = {
      nodes: [],
      edges: []
    };
    const div = document.createElement('div');
    div.id = 'graph-container';
    document.body.appendChild(div);
    ogma = new Ogma({ renderer: "canvas", graph, container: 'graph-container' });
  });
  afterEach(() => {
    render = [];
    if (wrapper) {
      wrapper.unmount();
    }
    ogma.destroy();
  });

  it("Should re-render on render function change", () => {
    wrapper = mountLayer(ogma);
    return ogma.view.afterNextFrame()
      .then(() => {
        expect(render).toEqual(['default']);
        wrapper.setProps({
          render: () => {
            render.push('new');
          }
        });
        return ogma.view.afterNextFrame();
      })
      .then(() => {
        expect(render).toEqual(['default', 'new']);
      });
  });
  it('Should re-render on opacity change', () => {
    wrapper = mountLayer(ogma);
    return ogma.view.afterNextFrame()
      .then(() => {
        expect(render).toEqual(['default']);
        wrapper.setProps({
          opacity: 0.5
        });
        return ogma.view.afterNextFrame();
      })
      .then(() => {
        expect(render).toEqual(['default', 'default']);
      });
  });
  it('Should re-render on isStatic change', () => {
    wrapper = mountLayer(ogma, { isStatic: false });
    return ogma.view.afterNextFrame()
      .then(() => {
        expect(render).toEqual(['default']);
        wrapper.setProps({
          isStatic: true
        });
        return ogma.view.afterNextFrame();
      })
      .then(() => {
        expect(render).toEqual(['default', 'default']);
      });
  });
  it('Should re-render on noClear change', () => {
    wrapper = mountLayer(ogma, { noClear: false });
    return ogma.view.afterNextFrame()
      .then(() => {
        expect(render).toEqual(['default']);
        wrapper.setProps({
          noClear: true
        });
        return ogma.view.afterNextFrame();
      })
      .then(() => {
        expect(render).toEqual(['default', 'default']);
      });
  });
});

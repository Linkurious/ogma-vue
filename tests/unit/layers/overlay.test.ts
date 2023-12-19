import Ogma from "@linkurious/ogma";
import { describe, beforeEach, afterEach, it, expect } from "vitest";
import Overlay from "../../../src/components/layers/Overlay.vue";
import { OverlayProps } from "../../../src/hooks/useLayer";
import { createWrapper } from "../utils";
let ogma: Ogma;
let graph;
const defaultSlot = `<div id="layer"></div>`;
const mountLayer = createWrapper<OverlayProps>(Overlay, {
  props: {
    visible: true,
    size: { width: 100, height: 100 },
    level: 1,
  },
  slots: {
    default: defaultSlot
  },
});
let wrapper: ReturnType<typeof mountLayer>;
function getTranslation() {
  const transform = ogma.getContainer()!.children[0].children[1].style.transform;
  const [_, x, y] = transform.match(/rotate\(\d+rad\) translate\((\d+)px, (\d+)px\)/);
  return { x: parseInt(x), y: parseInt(y) };
}

function getSize() {
  const { width, height } = ogma.getContainer()!.children[0].children[1].style;
  return { width: parseInt(width.slice(0, -2)), height: parseInt(height.slice(0, -2)) };
}
describe("Overlay.vue", () => {
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
    if (wrapper) {
      wrapper.unmount();
    }
    ogma.destroy();
  });

  it("should respect position", () => {
    wrapper = mountLayer(ogma, {
      position: { x: 200, y: 100 },
    });
    return ogma.view.afterNextFrame()
      .then(() => {
        expect(getTranslation()).toEqual({ x: 200, y: 100 });
        wrapper.setProps({
          position: { x: 300, y: 200 },
        });
        return ogma.view.afterNextFrame();
      })
      .then(() => {
        expect(getTranslation()).toEqual({ x: 300, y: 200 });
      });
  });

  it("should respect size", () => {
    wrapper = mountLayer(ogma, {
      size: { width: 100, height: 100 },
    });
    return ogma.view.afterNextFrame()
      .then(() => {
        expect(getSize()).toEqual({ width: 100, height: 100 });
        wrapper.setProps({
          size: { width: 300, height: 200 },
        });
        return ogma.view.afterNextFrame();
      })
      .then(() => {
        expect(getSize()).toEqual({ width: 300, height: 200 });
      });
  });

});

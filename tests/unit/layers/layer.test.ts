import Ogma from "@linkurious/ogma";
import { ComponentMountingOptions, mount } from "@vue/test-utils";
import { describe, beforeEach, afterEach, it, expect } from "vitest";
import Layer from "../../../src/components/layers/Layer.vue";
import { LayerProps } from "../../../src/hooks/useLayer";

let ogma: Ogma;
let graph, wrapper;

const defaultSlot = `<div id="layer"></div>`;

function mountLayer(ogma: Ogma, params: ComponentMountingOptions<LayerProps>) {
  const defaultOptions = {
    props: {
      visible: true,
      level: 1
    },
    slots: {
      default: defaultSlot
    },
    global: {
      provide: {
        ogma
      },
    }
  };
  return mount(Layer, { ...defaultOptions, ...params });
}
function checkLayerContent(ogma: Ogma, index: number, expected = defaultSlot) {
  return expect(ogma.getContainer()!.children[0].children[index].innerHTML).toContain(expected);
}
function checkLayerVisible(ogma: Ogma, visible: boolean, index = 1) {
  const layer = ogma.getContainer()!.children[0].children[index].innerHTML;
  if (visible) {
    return expect(layer).toContain(defaultSlot);
  }
  return expect(layer).not.toContain(defaultSlot);
}

describe.only("Layer.vue", () => {
  beforeEach(() => {
    graph = {
      nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
      edges: [{ id: 0, source: 0, target: 1 }, { id: 1, source: 1, target: 2 }, { id: 2, source: 2, target: 3 }]
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
  });

  it("should show a layer", () => {
    wrapper = mountLayer(ogma, {});
    return ogma.view.afterNextFrame()
      .then(() => checkLayerContent(ogma, 1));
  });
  it("should respect level", () => {
    wrapper = mountLayer(ogma, {
      props: {
        level: -1
      }
    });
    return ogma.view.afterNextFrame()
      .then(() => {
        checkLayerContent(ogma, 0);
        wrapper.setProps({ level: 1 });
        return ogma.view.afterNextFrame();
      })
      .then(() => {
        checkLayerContent(ogma, 1);
        wrapper.setProps({ level: -Infinity });
        return ogma.view.afterNextFrame();
      })
      .then(() => {
        checkLayerContent(ogma, 0);
        wrapper.setProps({ level: Infinity });
        return ogma.view.afterNextFrame();
      })
      .then(() => checkLayerContent(ogma, 1));
  });
  it("should show/hide on visible change", () => {
    wrapper = mountLayer(ogma, {
      props: {
        visible: false
      }
    });
    return ogma.view.afterNextFrame()
      .then(() => {
        checkLayerVisible(ogma, false, 0);
        wrapper.setProps({ visible: true });
        return ogma.view.afterNextFrame();
      })
      .then(() => {
        checkLayerVisible(ogma, true, 0);
      });
  });

  it("should remove layer on unmount", () => {
    wrapper = mountLayer(ogma, {});
    return ogma.view.afterNextFrame()
      .then(() => {
        checkLayerVisible(ogma, true);
        wrapper.unmount();
        return ogma.view.afterNextFrame();
      })
      .then(() => {
        const siblings = ogma.getContainer()!.children[0].children.length;
        return expect(siblings).toBe(1);
      });
  });
});

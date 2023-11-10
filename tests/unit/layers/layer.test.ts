import { describe, beforeEach, afterEach, it, expect } from "vitest"
import { ComponentMountingOptions, mount } from "@vue/test-utils"
import Ogma from "@linkurious/ogma"
import Layer from "../../../src/components/layers/Layer.vue";
import { LayerP } from "../../../src/mixins/LayerMixin";

let ogma: Ogma;
let graph, wrapper;

const defaultSlot = `<div id="layer"></div>`;
function mountLayer(ogma: Ogma, params: ComponentMountingOptions<LayerP>) {
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
function checkLayerVisible(ogma: Ogma, visible: boolean) {
  const children = [...ogma.getContainer()!.children[0].children].map(c => c.innerHTML);
  if(visible) {
    return expect(children).toContain(defaultSlot);
  }
  return expect(children).not.toContain(defaultSlot);
}

describe("Layer.vue", () => {
  beforeEach(() => {
    graph = {
      nodes: [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }],
      edges: [{ id: 0, source: 0, target: 1 }, { id: 1, source: 1, target: 2 }, { id: 2, source: 2, target: 3 }]
    }
    const div = document.createElement('div');
    div.id = 'graph-container';
    document.body.appendChild(div);
    ogma = new Ogma({ renderer: "canvas", graph, container: 'graph-container' });
  })
  afterEach(() => {
    if (wrapper) {
      wrapper.unmount();
    }
  })

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
        checkLayerContent(ogma, 0)
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
      .then(() => checkLayerContent(ogma, 1))
  });
  it("should show/hide on visible change", () => {
    wrapper = mountLayer(ogma, {
      props: {
        visible: false
      }
    });
    return ogma.view.afterNextFrame()
      .then(() => {
        checkLayerVisible(ogma, false);
        wrapper.setProps({ visible: true });
        return ogma.view.afterNextFrame();
      })
      .then(() => {
        checkLayerVisible(ogma, true);
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
        checkLayerVisible(ogma, false);
      });
  });
});

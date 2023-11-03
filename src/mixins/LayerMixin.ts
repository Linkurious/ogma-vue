import { watch, onBeforeUnmount, onMounted, ref, inject, } from "vue";
import type { Ref } from 'vue';
import Ogma, { Layer, Overlay, DrawingFunction } from '@linkurious/ogma';

export type Props<T, P> = {
  type: T;
  props: P;
};
export type LayerP = Props<'layer', {
  visible: boolean;
  level: number;
}>;

export type OverlayP = Props<'overlay', {
  position: { x: number; y: number };
  size: { width: number; height: number };
} & LayerP['props']>;

export type CanvasP = Props<'canvas', {
  isStatic: boolean;
  noClear: boolean;
  render: DrawingFunction;
} & LayerP['props']>;

export type Layers = LayerP | OverlayP | CanvasP;
function isLayerP(type: string, props: Layers['props']): props is LayerP['props'] {
  return type === 'layer';
}
function isOverlayP(type: string, props: Layers['props']): props is OverlayP['props'] {
  return type === 'overlay';
}
function isCanvasP(type: string, props: Layers['props']): props is CanvasP['props'] {
  return type === 'canvas';
}

export function useLayer<L extends Layers>(type: L['type'], container: Ref<HTMLElement | undefined>, props: L['props']) {
  // type of layer is Layer if type is 'layer' or Overlay if type is 'overlay'
  const layer = ref<L['type'] extends 'layer' ? Layer : Overlay>();
  const ogma = inject<Ogma>('ogma');
  function moveTo(level: number) {
    if (!layer.value || isNaN(level)) return;
    if (level === Infinity) {
      layer.value.moveToTop();
    } else if (level === -Infinity) {
      layer.value.moveToBottom();
    } else {
      layer.value.moveTo(level);
    }
  }

  function createLayer() {
    if (isCanvasP(type, props)) {
      return ogma?.layers.addCanvasLayer(props.render, {
        isStatic: props.isStatic,
        noClear: props.noClear,
      });
    }
    if (!container.value) return;
    if (isOverlayP(type, props)) {
      return ogma?.layers.addOverlay({
        element: container.value,
        position: props.position,
        size: props.size,
      });
    }

    if (isLayerP(type, props)) {
      return ogma?.layers.addLayer(container.value);
    }
  }
  watch([props.level], () => {
    moveTo(props.level);
  })
  watch([props.visible], () => {
    if (!layer.value) return;
    if (props.visible) return layer.value?.hide();
    if (!props.visible) return layer.value?.show();
  })
  onMounted(() => {
    if (layer.value) return;
    layer.value = createLayer();
    moveTo(props.level);
  });
  onBeforeUnmount(() => {
    if (!layer.value) return;
    layer.value.destroy();
  })
  return layer;
}

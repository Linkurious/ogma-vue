import Ogma, {
  Layer,
  Overlay,
  DrawingFunction,
  CanvasLayer,
} from "@linkurious/ogma";
import { watch, onBeforeUnmount, onMounted, ref, inject, Ref } from "vue";

type TypeMap<T, P> = {
  type: T;
  props: P;
};
export type LayerProps = {
  visible: boolean;
  level: number;
  opacity?: number;
};
export type OverlayProps = {
  position: { x: number; y: number; };
  size: { width: number; height: number; };
} & LayerProps;
type CanvasLayerOptions = {
  isStatic: boolean;
  noClear: boolean;
};
export type CanvasLayerProps = {
  /**
    * [Drawing function](https://doc.linkurio.us/ogma/latest/api.html#DrawingFunction)
    */
  render: DrawingFunction;
} & CanvasLayerOptions & LayerProps;

type LayerP = TypeMap<"layer", LayerProps>;
type OverlayP = TypeMap<"overlay", OverlayProps>;
type CanvasP = TypeMap<
  "canvas",
  CanvasLayerProps
>;

export type Layers = LayerP | OverlayP | CanvasP;
function isLayer(
  type: string,
  props: Layers["props"],
): props is LayerProps {
  return type === "layer";
}
function isOverlay(
  type: string,
  props: Layers["props"],
): props is OverlayProps {
  return type === "overlay";
}
function isCanvas(
  type: string,
  props: Layers["props"],
): props is CanvasLayerProps {
  return type === "canvas";
}

export function useLayer<L extends Layers>(
  type: L["type"],
  container: Ref<HTMLElement | undefined>,
  props: L["props"],
) {
  // type of layer is Layer if type is 'layer' or Overlay if type is 'overlay'
  const layer =
    ref<
      L["type"] extends "layer"
      ? Layer
      : L["type"] extends "overlay"
      ? Overlay
      : CanvasLayer
    >();
  const ogma = inject<Ogma>("ogma") as Ogma;
  const options: CanvasLayerOptions = {
    isStatic: false,
    noClear: false,
  };
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

  function destroyLayer() {
    if (!layer.value) return;
    layer.value.destroy();
  }

  function createLayer() {
    destroyLayer();
    if (isCanvas(type, props)) {
      options.isStatic = props.isStatic;
      options.noClear = props.noClear;
      const canvasLayer = ogma.layers.addCanvasLayer(props.render, options);
      canvasLayer.setOpacity(props.opacity === undefined ? 1 : props.opacity);
      return canvasLayer;
    }
    const ctnr = container.value as HTMLElement;
    if (isOverlay(type, props)) {
      return ogma?.layers.addOverlay({
        element: ctnr,
        position: props.position,
        size: props.size,
      });
    }

    if (isLayer(type, props)) {
      return ogma?.layers.addLayer(ctnr);
    }
  }

  watch(props, (old, curr) => {
    if (!layer.value) return;
    const lv = layer.value;
    const { level } = curr;
    if (old.level !== level) {
      if (level === -Infinity) {
        lv.moveToBottom();
      } else if (level === Infinity) {
        lv.moveToTop();
      } else {
        lv.moveTo(level);
      }
    }
    if (old.visible !== curr.visible) {
      if (curr.visible) lv.show();
      else lv.hide();
    }
    if (isCanvas(type, old) && isCanvas(type, curr)) {
      const l = layer.value as CanvasLayer;
      if (old.isStatic !== curr.isStatic) {
        options.isStatic = curr.isStatic;
      }
      if (old.noClear !== curr.noClear) {
        options.noClear = curr.noClear;
      }
      if (old.opacity !== curr.opacity) {
        l.setOpacity(curr.opacity === undefined ? 1 : curr.opacity);
      }
      if (old.render !== curr.render) {
        l.refresh(curr.render);
      }
    }
    if (isOverlay(type, old) && isOverlay(type, curr)) {
      const l = layer.value as Overlay;
      if (old.position !== curr.position) {
        l.setPosition(curr.position);
      }
      if (old.size !== curr.size) {
        l.setSize(curr.size);
      }
    }
    moveTo(props.level);
  });
  onMounted(() => {
    if (layer.value) return;
    // @ts-expect-error
    layer.value = createLayer();
    moveTo(props.level);
  });
  onBeforeUnmount(() => {
    if (!layer.value) return;
    layer.value.destroy();
  });
  return layer;
}

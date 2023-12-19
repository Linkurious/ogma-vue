import Ogma, {
  Layer,
  Overlay,
  DrawingFunction,
  CanvasLayer,
} from "@linkurious/ogma";
import { watch, onBeforeUnmount, onMounted, inject, Ref, watchEffect } from "vue";

type TypeMap<T, P> = {
  type: T;
  props: P;
};
export type LayerProps = {
  visible?: boolean;
  level?: number;
  opacity?: number;
};
export type OverlayProps = {
  position: { x: number; y: number; };
  size: { width: number; height: number; };
} & LayerProps;
type CanvasLayerOptions = {
  isStatic?: boolean;
  noClear?: boolean;
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
  props: Required<L["props"]>,
) {
  // type of layer is Layer if type is 'layer' or Overlay if type is 'overlay'
  let layer: L["type"] extends "layer"
    ? Layer
    : L["type"] extends "overlay"
    ? Overlay
    : CanvasLayer;

  const ogma = inject<Ogma>("ogma") as Ogma;
  const options: CanvasLayerOptions = {
    isStatic: false,
    noClear: false,
  };
  function moveTo(level: number) {
    if (!layer || isNaN(level)) return;
    if (level === Infinity) {
      layer.moveToTop();
    } else if (level === -Infinity) {
      layer.moveToBottom();
    } else {
      layer.moveTo(level);
    }
  }

  function destroyLayer() {
    if (!layer) return;
    layer.destroy();
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

  watchEffect(() => {
    if (props.level === undefined) return;
    moveTo(props.level);
  });
  watchEffect(() => {
    if (props.visible) layer?.show();
    else layer?.hide();
  });
  watchEffect(() => {
    if (!layer) return;
    if (isCanvas(type, props)) {
      layer.setOpacity(props.opacity === undefined ? 1 : props.opacity);
      options.isStatic = props.isStatic;
      options.noClear = props.noClear;
      (layer as CanvasLayer).refresh(props.render);
    }
    if (isOverlay(type, props)) {
      layer.setPosition(props.position);
      layer.setSize(props.size);
    }
  });
  onMounted(() => {
    if (layer) return;
    // @ts-expect-error
    layer = createLayer();
    if (props.level !== undefined) {
      moveTo(props.level);
    }
    if (!props.visible) layer?.hide();
  });
  onBeforeUnmount(() => {
    if (!layer) return;
    layer.destroy();
  });
}

<template>
  <Overlay :visible="visible" :position="coords" :size="{ width: 100, height: 10 }"
    :class="`ogma-tooltip ogma-tooltip--${placement}`">
  </Overlay>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, watch } from "vue";
import Overlay from "./Overlay.vue";
import Ogma, { Point } from "@linkurious/ogma";
/**
 * Creates a tooltip on nodes using ovrlay
 * @displayName Toolip
 */
const ogma = inject<Ogma>("ogma") as Ogma;
const coords = ref({ x: 0, y: 0 });
const visible = ref(false);
const placement = ref("right");
watch(coords, (newValue) => {
  placement.value = getAdjustedPlacement(newValue);
});
onMounted(() => {
  ogma.events.on("mouseover", ({ target, x, y }) => {
    if (target && target.isNode) {
      coords.value = target.getPosition();
    } else {
      coords.value = { x, y };
    }
    visible.value = true;
  });
  ogma.events.on("mouseout", () => {
    visible.value = false;
  });
});

function getAdjustedPlacement(coords: Point) {
  const { width: screenWidth, height: screenHeight } =
    ogma.view.getSize();
  const { x, y } = ogma.view.graphToScreenCoordinates(coords);
  const plmt = placement.value;
  let res = plmt;
  const { width, height } = { width: 10, height: 10 };

  if (plmt === "left" && x - width < 0) res = "right";
  else if (plmt === "right" && x + width > screenWidth) res = "left";
  else if (plmt === "bottom" && y + height > screenHeight) res = "top";
  else if (plmt === "top" && y - height < 0) res = "bottom";

  if (res === "right" || res === "left") {
    if (y + height / 2 > screenHeight) res = "top";
    else if (y - height / 2 < 0) res = "bottom";
  } else {
    if (x + width / 2 > screenWidth) res = "left";
    else if (x - width / 2 < 0) res = "right";
  }
  return res;
}
</script>

<style scoped>
.ogma-tooltip,
.ogma-popup {
  z-index: 401;
  box-sizing: border-box;
}

.ogma-tooltip--content,
.ogma-popup--body {
  transform: translate(-50%, 0);
  background-color: var(--overlay-background-color);
  color: var(--overlay-text-color);
  border-radius: 5px;
  padding: 5px;
  box-sizing: border-box;
  box-shadow: 0 8px 30px rgb(0 0 0 / 12%);
  width: auto;
  height: auto;
  position: relative;
}

.ogma-tooltip {
  /* transition: linear;
  transition-property: transform;
  transition-duration: 50ms; */
  pointer-events: none;
}

.ogma-popup--body {
  transform: translate(-50%, -100%);
}

.ogma-tooltip--content:after,
.ogma-popup--body:after {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 7px 6px 0;
  border-color: transparent var(--overlay-background-color) transparent transparent;
  position: absolute;
  left: 50%;
  top: auto;
  bottom: 3px;
  right: auto;
  transform: translate(-50%, 100%) rotate(270deg);
}

.ogma-popup--close {
  position: absolute;
  top: 0px;
  right: 5px;
  cursor: pointer;
}

.ogma-popup--top .ogma-popup--body,
.ogma-tooltip--top .ogma-tooltip--content {
  bottom: 6px;
  transform: translate(-50%, -100%);
}

.ogma-popup--bottom .ogma-popup--body,
.ogma-tooltip--bottom .ogma-tooltip--content {
  transform: translate(-50%, 0%);
  top: 3px;
}

.ogma-popup--bottom .ogma-popup--body:after,
.ogma-tooltip--bottom .ogma-tooltip--content:after {
  top: 3px;
  bottom: auto;
  transform: translate(-50%, -100%) rotate(90deg);
}

.ogma-popup--right .ogma-popup--body,
.ogma-tooltip--right .ogma-tooltip--content {
  transform: translate(0, -50%);
  left: 6px;
}

.ogma-popup--right .ogma-popup--body:after,
.ogma-tooltip--right .ogma-tooltip--content:after {
  left: 0%;
  top: 50%;
  transform: translate(-100%, -50%) rotate(0deg);
}

.ogma-popup--left .ogma-popup--body,
.ogma-tooltip--left .ogma-tooltip--content {
  transform: translate(-100%, -50%);
  right: 6px;
}

.ogma-popup--left .ogma-popup--body:after,
.ogma-tooltip--left .ogma-tooltip--content:after {
  right: 0%;
  left: auto;
  top: 50%;
  transform: translate(100%, -50%) rotate(180deg);
}
</style>

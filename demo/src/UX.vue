<template>
  <div class="ui">
    <n-button @click="onToggleGrouping">{{
      props.grouping.enabled ? "disable grouping" : "enable grouping"
    }}</n-button>

    <n-button @click="onToggleFilter">{{ props.filter.enabled ? "disable filter" : "enable filter" }}
    </n-button>

    <span>
      Node color
      <n-color-picker :default-value="props.rule.nodeAttributes.color" :on-update:value="onColorChange" />
    </span>
    <span>
      <!-- <n-switch @update:value="(e) => $emit('tooltipToggle', e)" /> -->
      <!-- tooltip on select -->
    </span>
  </div>
</template>

<script setup lang="ts">
import Ogma from '@linkurious/ogma';
import { inject, onMounted, provide, watch } from "vue";
import {
  NodeGroupingProps,
  NodeFilterProps,
  StyleRuleProps

} from '../../src/main';

const props = defineProps<{
  grouping: NodeGroupingProps;
  filter: NodeFilterProps;
  rule: StyleRuleProps;
}>();
// define emits for v-model
const emit = defineEmits<{
  (event: "update:grouping", value: NodeGroupingProps): void;
  (event: "update:filter", value: NodeFilterProps): void;
  (event: "update:rule", value: StyleRuleProps): void;
}>();

const ogma = inject<Ogma>("ogma");
function onToggleGrouping() {
  emit("update:grouping", {
    ...props.grouping,
    enabled: !props.grouping.enabled
  });
}
function onToggleFilter() {
  emit("update:filter", {
    ...props.filter,
    enabled: !props.filter.enabled
  });
}
function onColorChange(e) {
  emit("update:rule", {
    ...props.rule,
    nodeAttributes: {
      ...props.rule.nodeAttributes,
      color: e
    }
  });
  // this.rule.nodeAttributes.color = e;
}

watch([props.filter], (e) => {
  console.log('UX', e);
});
onMounted(() => {
  console.log('UX', props.filter);
});
</script>
<style>
.ui {
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0;
  top: 2px;
  bottom: 100px;
  border: 1px solid sblack;
  box-shadow: -4px 0px 20px -6px grey;
  z-index: 10;
  background: white;
  min-width: 180px;
}

.ui>.n-button {
  margin: 2px;
}
</style>
<template>
  <div class="ui">
    <n-form label-placement="top">
      <n-form-item path="grouping" label="Grouping">
        <n-switch
          v-model:value="grouping.options.enabled"
          :on-update:value="onToggleGrouping"
        />
      </n-form-item>
      <n-form-item path="filter" label="Filter">
        <n-switch
          v-model:value="filter.options.enabled"
          :on-update:value="onToggleFiler"
        />
      </n-form-item>
      <n-form-item path="radius" label="Node Radius">
        <n-slider
          v-model:value="rule.nodeAttributes.radius"
          :step="1"
          :min="5"
          :max="10"
        />
      </n-form-item>
    </n-form>
  </div>
</template>

<script>
import { provide } from "vue";

export default {
  name: "UX",
  props: ["ogma"],
  inject: ["grouping", "filter", "rule", "tooltip"],
  setup(props) {
    provide("ogma", props.ogma);
  },
  data() {
    return {
      color: "rgba(153, 0, 0, 1)",
    };
  },
  methods: {
    onToggleGrouping() {
      this.grouping.options = this.grouping.options = {
        ...this.grouping.options,
        enabled: !this.grouping.options.enabled,
      };
    },
    onToggleFilter() {
      this.filter.options = this.filter.options = {
        ...this.filter.options,
        enabled: !this.filter.options.enabled,
      };
    },
    onColorChange(e) {
      this.rule.nodeAttributes.color = e;
    },
  },
};
/*
 <span>
      Node color
      <n-color-picker
        :default-value="rule.nodeAttributes.color"
        :on-update:value="onColorChange"
      />
    </span>
    <span>
      <n-switch @update:value="(e) => $emit('tooltipToggle', e)" />
      tooltip on select
    </span>
*/
</script>
<style>
.ui {
  display: flex;
  flex-direction: column;
  right: 0;
  top: 2px;
  bottom: 100px;
  border: 1px solid sblack;
  box-shadow: -4px 0px 20px -6px grey;
  z-index: 10;
  background: white;
  min-width: 180px;
}
.ui > .n-button {
  margin: 2px;
}
</style>
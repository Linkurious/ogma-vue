<template>
    <n-form class="ui" label-placement="top">
      <n-form-item path="filter" label="Filter">
        <n-switch
          v-model:value="filter.options.enabled"
          :on-update:value="onToggleFilter"
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
       <n-form-item path="color" label="Node Color">
        <n-color-picker
          :default-value="rule.nodeAttributes.color"
          :on-update:value="onColorChange"
        />
      </n-form-item>
    </n-form>
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
</script>
<style>
.ui {
  margin-left: 10px;
  min-width: 150px;
}
.ui > .n-button {
  margin: 2px;
}
</style>
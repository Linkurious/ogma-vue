<script setup lang="ts">
import {
  provide,
  defineProps,
  ref,
  onMounted,
  withDefaults,
  watch,
  defineEmits,
} from "vue";
import Ogma from "./Ogma.vue";
import EdgeFilter from "./transformations/EdgeFilter.vue";

</script>
<template>
  <div>
    <Ogma :graph="{ nodes: [] }" />
  </div>
</template>

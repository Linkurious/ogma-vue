```vue
<template>
...
 <NodeGrouping
    :options="groupingOptions"
    @enabled="onEnabled"
  />
...
</template>
<script>
import { NodeGrouping } from "@linkurious/ogma-vue"
export default {
  name: "example",
  data() {
    return {
      groupingOptions: {
        enabled: true,
        nodeSelector: () => true,
        duration: 1000,
        groupIdFunction: (node) => node.getId() % 2,
        showContents: true,
       }
    }
  },
  methods: {
    onEnabled(transformation){
      console.log("Enabled: ", transformation)
    }
  }
}
</script>
```
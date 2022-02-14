```vue
<template>
...
 <NodeFilter
    :options="filterOptions"
    @enabled="onEnabled"
  />
...
</template>
<script>
import { NodeFilter } from "@linkurious/ogma-vue"
export default {
  name: "example",
  data() {
    return {
      filterOptions: {
        enabled: true,
        criteria: () => true,
        duration: 1000,
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
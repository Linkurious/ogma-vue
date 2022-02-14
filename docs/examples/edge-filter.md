```vue
<template>
...
 <EdgeFilter
    :options="filterOptions"
    @enabled="onEnabled"
  />
...
</template>
<script>
import { EdgeFilter } from "@linkurious/ogma-vue"
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
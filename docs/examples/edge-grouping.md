```vue
<template>
...
 <EdgeGrouping
    :options="groupingOptions"
    @enabled="onEnabled"
  />
...
</template>
<script>
import { EdgeGrouping } from "@linkurious/ogma-vue"
export default {
  name: "example",
  data() {
    return {
      groupingOptions: {
        enabled: true,
        selector: () => true,
        duration: 1000,
        groupIdFunction: (edge) => edge.getId() % 2,
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
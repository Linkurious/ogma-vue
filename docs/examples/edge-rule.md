```vue
<template>
...
 <EdgeRule
    :options="styleOptions"
  />
...
</template>
<script>
import { EdgeRule } from "@linkurious/ogma-vue"
export default {
  name: "example",
  data() {
    return {
      styleOptions: {
        edgeAttributes:{
          color: "blue"
        },
        edgeSelector: () => true,
       }
    }
  },
}
</script>
```
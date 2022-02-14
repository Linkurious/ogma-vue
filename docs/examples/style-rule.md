```vue
<template>
...
 <StyleRule
    :options="styleOptions"
  />
...
</template>
<script>
import { StyleRule } from "@linkurious/ogma-vue"
export default {
  name: "example",
  data() {
    return {
      styleOptions: {
        nodeAttributes:{
          color: "blue"
        },
        nodeSelector: () => true,
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
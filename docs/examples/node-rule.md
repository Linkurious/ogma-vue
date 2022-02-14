```vue
<template>
...
 <NodeRule
    :options="styleOptions"
  />
...
</template>
<script>
import { NodeRule } from "@linkurious/ogma-vue"
export default {
  name: "example",
  data() {
    return {
      styleOptions: {
        nodeAttributes:{
          color: "blue"
        },
        nodeSelector: () => true,
       }
    }
  },
}
</script>
```
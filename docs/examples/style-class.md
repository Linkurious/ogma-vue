```vue
<template>
...
 <StyleClass
    :options="classOptions"
  />
...
</template>
<script>
import { StyleClass } from "@linkurious/ogma-vue"
export default {
  name: "example",
  data() {
    return {
      classOptions: {
        name: "super class",
        nodes: this.ogma.getNodeList(),
        edges: this.ogma.getEdges(),
        nodeAttributes:{
          color: "blue"
        },
        edgeAttributes:{
          color: "blue"
        },
       }
    }
  },
}
</script>
```
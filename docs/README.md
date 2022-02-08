# Home

Ogma Vue 3 is a full integration of [Ogma](https://doc.linkurio.us/ogma/latest/) in Vue.js.

### Getting started.

First, you need to own a valid **Ogma** licence. Reach out [Ogma sales](https://doc.linkurio.us/ogma/latest/support.html) for more details.
Let's say you start from scratch:

```bash
vue create my-vue-ogma-app
cd my-vue-ogma-app
```

#### Install Ogma and Ogma-vue3
```bash
npm i @linkurious/ogma @linkurious/ogma-vue3
```

#### Use Ogma-vue3 in your App

```vue
<template>
  <div>
    ...Your App
    <OgmaVue
      :ogma="ogma"
      :graph="graph"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { Ogma as Ogmavue, StyleRule } from "ogma-vue3";
import Ogma from "@linkurious/ogma";

const ogma = new Ogma();

export default {
  name: "App",
  data() {
    return {
      ogma,
      width: 512,
      height: 512,
      graph: {nodes: [{id: 1}, {id: 2}], edges: [{id: 0, source: 1, target: 2}] }
    }
  }
}
</script>
```

That's it ! You have a fully functionnal Ogma instance within your app. 
To go further, we encourage you reading the [components](./components/Ogma.md) section to see how to add transformations, styles and more. You should check out as well the [Events]() section
See the Components documentation to see how you can add style rules, 

### Register to events

You might want to use vue `@` syntax to register to Ogma events. You can. By default, `OgmaVue` will emit all events sent by `Ogma`. You can then write

```vue
    <OgmaVue
      ...props
      :@addNodes="onAddNodes"
    />
```

If you want to optimize performances, you can pass as a prop the list of events you want to register to: 
```vue
    <OgmaVue
      ...props
      :events="[addNodes, addEdges]"
      :@addNodes="onAddNodes"
      :@addEdges="onAddEdges"
    />
```


Other components triger events too. Tranformations
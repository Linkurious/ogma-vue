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
npm i @linkurious/ogma @linkurious/ogma-vue
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
import { Ogma as Ogmavue, StyleRule } from "@linkurious/ogma-vue";
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
See [Ogma events API](https://doc.linkurio.us/ogma/latest/api.html#Event:-addEdges) for further details.

Tranformations for instance trigger `enabled` `disabled`, `indexChanged`, `refreshed` and `destroyed`.
```vue
    <NodeFilter
      ...props
      :@refreshed="onFilterRefreshed"
    />
```
As for `Ogma` component, by default it will register and emit `all` events, but you can specify which ones you want to register to: 
```vue
    <NodeFilter
      ...props
      :events="[refreshed]"
      :@refreshed="onFilterRefreshed"
    />
```
See [Ogma transformations events](https://doc.linkurio.us/ogma/latest/api.html#Event:-transformationDestroyed) for further details.


### Setting styles

Ogma provides a variety of APIs to add styles to your graph: `Classes`, `EdgeRule`, `NodeRule` and `StyleRule`.

Let's see how we can use them.

#### StyleClass

```vue
    <StyleClass
      :nodes="nodes"
      :edges="edges"
      :options="options"
    />
```

```javascript
  data() {
    return {
      nodes: ogma.getNodes().filter(n => n.getId()  < 10),
      // let's say we don't want to apply the class to any edge
      edges: ogma.edgeList(),
      options: {
        name: "my super class",
        nodeAttributes: {
          node => node.getId() % 2  ? "green" : "blue"
        }
       }
    }
  }
```

See [component reference](src/components/styles/StyleClass)  and [createClass API](https://doc.linkurio.us/ogma/latest/api.html#Ogma-styles-createClass) for more details. 

#### EdgeRule

```vue
    <EdgeRule
      :options="options"
    />
```

```javascript
  data() {
    return {
      options: {
        selector: (edge) => true,
        rule: {
          width: 2,
          color: edge => edge.getId() % 2 ? 'blue' : 'green' 
        },
       }
    }
  }
```

See [component reference](src/components/styles/EdgeRule)  and [createClass API](https://doc.linkurio.us/ogma/latest/api.html#Ogma-styles-addEdgeRule) for more details.

#### NodeRule

```vue
    <NodeRule
      :options="options"
    />
```

```javascript
  data() {
    return {
      options: {
        selector: (node) => true,
        rule: {
          radius: 20,
          color: node => node.getId() % 2 ? 'blue' : 'green' 
        },
       }
    }
  }
```

See [component reference](src/components/styles/NodeRule)  and [createClass API](https://doc.linkurio.us/ogma/latest/api.html#Ogma-styles-addNodeRule) for more details.

#### StyleRule

```vue
    <StyleRule
      :options="options"
    />
```

```javascript
  data() {
    return {
      options: {
        edgeSelector: (edge) => true,
        nodeSelector: (node) => true,
        edgeAttributes: {
          width: 2,
          color: edge => edge.getId() % 2 ? 'blue' : 'green' 
        },
        nodeAttributes: {
          radius: 20,
          color: node => node.getId() % 2 ? 'blue' : 'green' 
        },
       }
    }
  }
```

See [component reference](src/components/styles/StyleRule)  and [createClass API](https://doc.linkurio.us/ogma/latest/api.html#Ogma-styles-addRule) for more details.


### Using tranformations

Adding tranformations in Ogma is easy, it allows you to filter, group nodes and edges, and do many more things.  

Let's have a look at the transformations you will most likelly use: 

#### Node Grouping

```vue
    <NodeGrouping
      :options="groupingOptions"
    />
```

```javascript
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
  }
```
See [component reference](src/components/transformations/NodeGrouping)  and [addNodeGrouping API](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNodeGrouping) for more details.

#### Node Filter

```vue
    <NodeFilter
      :options="filterOptions"
    />
```

```javascript
  data() {
    return {
      filterOptions: {
        enabled: true,
        criteria: () => true,
        duration: 1000,
       }
    }
  }
```
See [component reference](src/components/transformations/NodeFilter)  and [addNodeFilter API](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNodeFilter) for more details.

#### Advices on tranformations

 - Do not use conditional rendering to enable/disable your transformation, use the `enabled` prop instead. 
 - Check out Ogma [examples](https://doc.linkurio.us/ogma/latest/examples/filter-nodes.html) and read the Ogma [grouping tutorial](https://doc.linkurio.us/ogma/latest/tutorials/grouping/index.html). 
 - To layout the graph properly after a transformation has run, you can register to `@refreshed` events.
 - The functions are not reactive because Ogma does not allow it. It will be fixed in a further version. In the meanwhile, just keep the same function and modify its behaviour if needed.


### Using Tools

Ogma provides different tools to interract with the graph. You can use thoose tools simply by adding componenents to your app.

```vue
    <Lasso
      :enabled="enabled"
      :options="lassoOptions"
    />
```
See [component reference](src/components/tools/Lasso)  and [lasso API](https://doc.linkurio.us/ogma/latest/api.html#Ogma-tools-lasso) for more details.


### Custom components

Ogma vue uses `provide`/`inject` to pass on Ogma instance to the elements in its slots.
This means you can write things like this:

```vue
<template>
  <div>
    My super UX
    <StyleRule :options="rule" />
  </div>
</template>

<script>
import { StyleRule } from "@linkurious/ogma-vue";
import { provide } from "vue";

export default {
  name: "UX",
  props: ["ogma"],
  setup(props) {
    provide("ogma", props.ogma);
  },
  data() {
    return {
      rule: {
        nodeSelector: () => true,
        nodeAttributes: {
          color: "blue",
        },
      },
    };
  },
  components: {
    StyleRule,
  },
};
</script>
```
It allows you to use composition API, create UI/UX which contains the styles or transformations it handles. 

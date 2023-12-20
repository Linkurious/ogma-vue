# Getting started.

First, you need to own a valid [Ogma](https://doc.linkurious.com/ogma/latest/) lisense. Reach out [Ogma sales](https://doc.linkurious.com/ogma/latest/contact.html) for more details.
Let's say you start from scratch, create a vue project with vue-cli:

```bash
vue create my-vue-ogma-app
cd my-vue-ogma-app
```

Or with vite:

```bash
npm init vite@latest my-vue-ogma-app
cd my-vue-ogma-app
```

Then, you need to install Ogma and Ogma-vue

## Install Ogma and Ogma-vue

```bash
npm i @linkurious/ogma @linkurious/ogma-vue
```

### Use Ogma-vue3 in your App

```vue
<template>
  <div>
    ...Your App
    <OgmaVue :graph="graph" :layoutOnMounted="true" />
  </div>
</template>

<script setup lang="ts">
import { Ogma as OgmaVue, RawGraph } from "@linkurious/ogma-vue";
import Ogma from "@linkurious/ogma";

const graph = ref<RawGraph>({
  nodes: [{ id: 1 }, { id: 2 }],
  edges: [{ id: 0, source: 1, target: 2 }],
});
</script>
```

That's it ! You have a fully functionnal Ogma instance within your app.
To go further, we encourage you reading the [components](/src/components/Ogma.md) section to see how to add transformations, styles and more. You should check out as well the

## Register to events

Some components provide events you can register to. Let's see how it works.

### Ogma events

The list of events an Ogma instance can emit is available [here](https://doc.linkurious.com/ogma/latest/api.html#Events).
By default, `OgmaVue` will re-emit all of them, and you can register to them like this:

```vue
<OgmaVue @addNodes="onAddNodes" />
```

If you want to optimize performances, you can pass as a prop the list of events you want to register to:

```vue
<OgmaVue
  :events="[addNodes, addEdges]"
  :@addNodes="onAddNodes"
  :@addEdges="onAddEdges"
/>
```

This way, the Ogma component will only register to `addNodes` and `addEdges` events, and will ignore all others.

### Transformations events

Tranformations for instance trigger `enabled` `disabled`, `indexChanged`, `refreshed` and `destroyed`.

```vue
<NodeFilter ...props :@refreshed="onFilterRefreshed" />
```

As for `Ogma` component, by default it will register and emit `all` events, but you can specify which ones you want to register to:

```vue
<NodeFilter ...props :events="[refreshed]" :@refreshed="onFilterRefreshed" />
```

See [Ogma transformations events](https://doc.linkurio.us/ogma/latest/api.html#Event:-transformationDestroyed) for further details.

## Styling

Ogma provides a variety of APIs to add styles to your graph: `Classes`, `EdgeRule`, `NodeRule` and `StyleRule`.

Let's see how we can use them.

### StyleClass

<!--@include: ../../../examples/style-class.md-->

See [component reference](src/components/styles/StyleClass) and [createClass API](https://doc.linkurio.us/ogma/latest/api.html#Ogma-styles-createClass) for more details.

### EdgeRule

<!--@include: ../../../examples/edge-rule.md-->

See [component reference](src/components/styles/EdgeRule) and [createClass API](https://doc.linkurio.us/ogma/latest/api.html#Ogma-styles-addEdgeRule) for more details.

### NodeRule

<!--@include: ../../../examples/node-rule.md-->

See [component reference](src/components/styles/NodeRule) and [createClass API](https://doc.linkurio.us/ogma/latest/api.html#Ogma-styles-addNodeRule) for more details.

### StyleRule

<!--@include: ../../../examples/style-rule.md-->

See [component reference](src/components/styles/StyleRule) and [createClass API](https://doc.linkurio.us/ogma/latest/api.html#Ogma-styles-addRule) for more details.

## Using tranformations

Adding tranformations in Ogma is easy, it allows you to filter, group nodes and edges, and do many more things.

Let's have a look at the transformations you will most likelly use:

### Node Grouping

<!--@include: ../../../examples/node-grouping.md-->

See [component reference](src/components/transformations/NodeGrouping) and [addNodeGrouping API](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNodeGrouping) for more details.

### Node Filter

<!--@include: ../../../examples/node-filter.md-->

See [component reference](src/components/transformations/NodeFilter) and [addNodeFilter API](https://doc.linkurio.us/ogma/latest/api.html#Ogma-transformations-addNodeFilter) for more details.

### Advices on tranformations

- Do not use conditional rendering to enable/disable your transformation, use the `enabled` prop instead.
- Check out Ogma [examples](https://doc.linkurio.us/ogma/latest/examples/filter-nodes.html) and read the Ogma [grouping tutorial](https://doc.linkurio.us/ogma/latest/tutorials/grouping/index.html).
- To layout the graph properly after a transformation has run, you can register to `@refreshed` events.

## Using Tools

Ogma provides different tools to interract with the graph. You can use thoose tools simply by adding componenents to your app.

```vue
<Lasso :enabled="enabled" :options="lassoOptions" />
```

See [component reference](src/components/tools/Lasso) and [lasso API](https://doc.linkurio.us/ogma/latest/api.html#Ogma-tools-lasso) for more details.

## Custom components

Here is an example of a component that allows you to enable/disable node grouping and change the color of the nodes.

```vue
<template>
  <div class="ui">
    <n-button @click="onToggleGrouping">{{
      props.grouping.enabled ? "disable grouping" : "enable grouping"
    }}</n-button>
    <span>
      Node color
      <n-color-picker
        :default-value="props.rule.nodeAttributes.color"
        :on-update:value="onColorChange"
      />
    </span>
  </div>
</template>

<script setup lang="ts">
import Ogma from "@linkurious/ogma";
import { inject, onMounted, provide, watch } from "vue";
import { NodeFilterProps, StyleRuleProps } from "@linkurious/ogma-vue";

const props = defineProps<{
  filter: NodeFilterProps;
  rule: StyleRuleProps;
}>();

const emit = defineEmits<{
  (event: "update:grouping", value: NodeGroupingProps): void;
  (event: "update:rule", value: StyleRuleProps): void;
}>();

const ogma = inject<Ogma>("ogma");
function onToggleGrouping() {
  emit("update:grouping", {
    ...props.grouping,
    enabled: !props.grouping.enabled,
  });
}

function onColorChange(e) {
  emit("update:rule", {
    ...props.rule,
    nodeAttributes: {
      ...props.rule.nodeAttributes,
      color: e,
    },
  });
}
</script>
```

Which you can then use within your app:

```vue
<template>
  <Ogma :graph="graph">
    <template>
      <StyleRule :node-attributes="rule.nodeAttributes" />
      <NodeGrouping
        :options="grouping.options"
        :enabled="grouping.enabled"
        @enabled="onGroupingEnabled"
      />
      <Layer>
        <UX
          v-model:grouping="grouping"
          v-model:filter="filter"
          v-model:rule="rule"
        />
      </Layer>
    </template>
  </Ogma>
</template>

<script setup lang="ts">

import { defineProps, ref } from "vue";
import { Ogma, StyleRule, NodeGrouping, StyleRuleProps, Layer } from "@linkurious/ogma-vue";
import UX from './UX.vue';
import Ogma from "@linkurious/ogma";

const graph = ref<RawGraph>({
  nodes: [{ id: 1 }, { id: 2 }],
  edges: [{ id: 0, source: 1, target: 2 }],
});

const grouping = ref<NodeGroupingProps>({
  enabled: false,
  options: {},
});

const rule = ref<StyleRuleProps>({
  nodeAttributes: {
    color: "red",
  },
});
```

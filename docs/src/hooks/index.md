# Hooks

For each component provided by this library, there is a hook that provides the component with generics for data types, refered as `ND` for node data and `ED` for edge data.

## useOgma

`useOgma` allows you pass your own ogma instance to the components. It can be usefull in cases when you want to add some ogma related logic on your top level component.
It also allows you to pass `ND` and `ED` generics so that every props and events will have the correct types.

### Pass your own instance to useOgma

```vue
<template>
  <div>
    <OgmaComponent :graph=graph />
  </div>
</template>
<script setup lang="ts">

import { useOgma, OgmaProps } from '@linkurious/vue-ogma';
import Ogma  from 'ogma';

const ogma = new Ogma();
// here you can pass your own ogma instance
const OgmaComponent = useOgma(ogma);
const graph = ref<OgmaProps['graph']>({
  nodes: [],
  edges: []
});

ogma.generate.random()
.then(() => {
  graph.value = ogma.getGraph();
});
```

### Type your nodes and edges data with generics

```vue

<template>
  <div>
    <OgmaComponent :graph=graph />
  </div>
</template>
<script setup lang="ts">

import { useOgma, OgmaProps } from '@linkurious/vue-ogma';
import Ogma  from 'ogma';

type ND = { name: string, address: string, age: number };
type ED = { weight: number, type: string };
// here you can pass your own ogma instance
const OgmaComponent = useOgma<ND, ED>(ogma);
const graph = ref<Rawgraph<ND, ED>>({
  nodes: [
    {id: 0, data: { name: 'John', address: 'Paris', age: 25 }},
    {id: 1, data: { name: 'Jane', address: 'London', age: 30 }},
  ],
  edges: [
    {id: 0, source: 0, target: 1, data: { weight: 1, type: 'friend' }},
  ]
});
```

## Transformations

For each transformation, there is a hook that provides the transformation with generics for data types, for instance:

```ts
import { useNeighborMerging } from "@linkurious/vue-ogma";
const NeighborMerging = useNeighborMerging<ND, ED>();
```

## Styles

For each style, there is a hook that provides the style with generics for data types, for instance:

```ts
import { useNodeRule } from "@linkurious/vue-ogma";
const NodeRule = useNodeRule<ND, ED>();
```

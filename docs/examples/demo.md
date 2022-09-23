### Demo
<div class="container">
  <Ogma 
    :ogma="ogmaRef" 
    :graph="graph"
    :width="910"
    @addNodes="onAddNodes"
  >
    <NodeGrouping 
      :options="groupingOptions" @enabled="onEnabled" @disabled="onDisabled"
    />
    <StyleRule :options="styles"/>
    <NodeRule :options="groupStyle"/>
  </Ogma>
  <div class="ui">
   <n-form
   label-placement="top"
   >
    <n-form-item path="enabled" label="Grouping">
      <n-switch 
        v-model:value="groupingOptions.enabled"
        :on-update:value="(value) => {
          groupingOptions = {
            ...groupingOptions,
            enabled: value
          }
        }"
      />
    </n-form-item>
    <n-form-item path="radius" label="Node Radius">
      <n-slider 
      v-model:value="styles.nodeAttributes.radius" 
      :step="1" 
      :min="5" 
      :max="10"/>
    </n-form-item>
   </n-form>
  </div>
</div>


<script setup>
import { h, ref } from 'vue'
import OgmaJS from '@linkurious/ogma'
const ogma = new OgmaJS();
const ogmaRef = ref(ogma)
const graph = ref({
  nodes: [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4}],
  edges: [
    {source: 0, target: 1},
    {source: 1, target: 2},
    {source: 2, target: 3},
    {source: 2, target: 4},
    {source: 0, target: 3},
    ]
})
const width = ref("");
const height = ref("");
const groupingOptions = ref({
    selector: node => node.getId() < 2,
    nodeGenerator: ({nodes, groupId})=>  ({
      id: 'First nodes'
    }),
    padding: 10,
    showContents:true,
    enabled: true,
    duration: 1000
});

const onAddNodes = ref(() => console.log("onAddNodes"))
const onEnabled = ref(({grouping}) => {
  ogma.layouts.force();
});
const onDisabled = ref(({grouping}) => {
  ogma.layouts.force()
});
const styles = ref({
  nodeSelector: (node) => !node.isVirtual(),
  nodeAttributes: {
    text: {
      content: node => node.getId(),
      minVisibleSize: 0,
    },
    radius: 10,
    color: 'rgba(74, 160, 100, 1)'
  }
})
const groupStyle = ref({
  selector: (node) => node.isVirtual(),
  rule: {
    text: {
      content: node => node.getId(),
      minVisibleSize: 0,
    },
    color: '#6ac285'
  }
})

</script>

<style>
.page>.theme-default-content{
  margin-left: 0;
}
.container{
  display: flex;
  flex-direction: row;
  /* border: 1px solid black; */
  width: fit-content;
}
.ui{
  min-width: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>

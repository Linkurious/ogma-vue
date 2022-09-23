
import Ogma from '../../src/components/Ogma.vue';
import NodeGrouping from '../../src/components/transformations/NodeGrouping.vue';
import StyleRule from '../../src/components/styles/StyleRule.vue';
import NodeRule from '../../src/components/styles/NodeRule.vue';
import naive from 'naive-ui'


export default function enhance({app, router, siteData}){
  app.use(naive)
  app.component('Ogma', Ogma)
  app.component('NodeGrouping', NodeGrouping)
  app.component('StyleRule', StyleRule)
  app.component('NodeRule', NodeRule)
}
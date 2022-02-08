const fs = require('fs')

module.exports = {
  // site config
  lang: 'en-US',
  title: 'Ogma-vue',
  description: 'Documentation for the Ogma-vue library',
  // theme and its config
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    sidebar: [
      '/',
      '/src/components/Ogma',
      {
        title: 'Layers',
        sidebarDepth: 10,
        children: [
          '/src/components/layers/Canvas',
          '/src/components/layers/Layer',
          '/src/components/layers/Overlay',
        ]
      },
      {
        title: 'Tools',
        children: [
          '/src/components/tools/ConnectNodes',
          '/src/components/tools/Lasso',
          '/src/components/tools/Legend',
          '/src/components/tools/Rewire',
          '/src/components/tools/Snapping',
        ]
      },
      {
        title: 'Transformations',
        children: [
          '/src/components/transformations/EdgeFilter',
          '/src/components/transformations/EdgeGrouping',
          '/src/components/transformations/GeoClustering',
          '/src/components/transformations/NeighborGeneration',
          '/src/components/transformations/NeighborMerging',
          '/src/components/transformations/NodeClustering',
          '/src/components/transformations/NodeCollapsing',
          '/src/components/transformations/NodeFilter',
          '/src/components/transformations/NodeGrouping',
          '/src/components/transformations/VirtualProperties',
        ]
      },
    ]
  },
}
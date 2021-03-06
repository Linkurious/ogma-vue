module.exports = {
  // site config
  lang: 'en-US',
  title: 'Ogma-vue',
  description: 'Documentation for the Ogma-vue library',
  // theme and its config
  base: "/ogma-vue/",
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: '/logo-small.svg',
    sidebar: [
      '/',
      {
        text: 'API',
        collapsible: true,
        children: [
          '/src/components/Ogma',
          {
            text: 'Layers',
            collapsible: true,
            children: [
              '/src/components/layers/Canvas',
              '/src/components/layers/Layer',
              '/src/components/layers/Overlay',
            ]
          },
          {
            text: 'Styles',
            collapsible: true,
            children: [
              '/src/components/styles/EdgeRule',
              '/src/components/styles/NodeRule',
              '/src/components/styles/StyleRule',
              '/src/components/styles/StyleClass',
            ]
          },
          {
            text: 'Tools',
            collapsible: true,
            children: [
              '/src/components/tools/ConnectNodes',
              '/src/components/tools/Lasso',
              '/src/components/tools/Legend',
              '/src/components/tools/Rewire',
              '/src/components/tools/Snapping',
            ]
          },
          {
            text: 'Transformations',
            collapsible: true,
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
      }
    ],
    repo: 'linkurious/ogma-vue',
  },
  plugins: [
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search',
          },
        },
      },
    ],
  ],
}
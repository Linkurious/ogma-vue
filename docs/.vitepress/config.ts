import { defineConfig } from 'vitepress';
import fs from 'fs/promises';

// recursively go into input dir and create a vitepress sidebar config
function createSidebar(dir) {
  return fs.readdir(dir, { withFileTypes: true })
    .then(files => {
      const promises = files.map(file => {
        if (file.isDirectory()) {
          return createSidebar(`${dir}/${file.name}`)
            .then(items => {
              return {
                text: file.name.slice(0, 1).toUpperCase() + file.name.slice(1),
                items,
              };
            });
        } else if (file.name.endsWith('.md')) {
          return {
            text: file.name.replace('.md', ''),
            link: `${dir.replace('docs/', '')}/${file.name.replace('.md', '')}`,
          };
        }
      });
      return Promise.all(promises);
    })
    .then(res => {
      return res.filter(r => r);
    });
}
const components = await createSidebar('docs/src');

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ogma-vue",
  description: "Vue wrapper for Ogma",
  base: '/ogma-vue/',
  head: [['link', { rel: 'icon', href: '/ogma-vue/favicon.ico' }]],
  themeConfig: {
    logo: '/logo-small.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'API', link: '/src/components/Ogma' },
      { text: 'Getting Started', link: '/getting-started' }
    ],

    sidebar: {
      '/src/': components,
    },
    outline: {
      level: [2, 3]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Linkurious/ogma-vue' }
    ]
  }
});

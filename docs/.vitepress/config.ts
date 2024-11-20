import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Export Settings Manager',
  description: 'Documentation for the Figma Export Settings Manager plugin',
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'API', link: '/api/' },
      { text: 'Examples', link: '/examples/' }
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Installation', link: '/guide/installation' }
        ]
      },
      {
        text: 'Features',
        items: [
          { text: 'Platform Presets', link: '/guide/platform-presets' },
          { text: 'Custom Presets', link: '/guide/custom-presets' },
          { text: 'Export Preview', link: '/guide/export-preview' },
          { text: 'Settings', link: '/guide/settings' }
        ]
      },
      {
        text: 'Advanced',
        items: [
          { text: 'API Reference', link: '/api/' },
          { text: 'Contributing', link: '/contributing' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yourusername/plugin-name' }
    ]
  }
});
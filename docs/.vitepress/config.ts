import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Helix Scripts',
  description: 'Documentation for Helix Scripts — premium FiveM resources',
  base: '/',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started/' },
      { text: 'Scripts', link: '/scripts/helix-lib' },
      { text: 'API Reference', link: '/api/' },
      { text: 'Guides', link: '/guides/framework-bridge' },
      { text: 'FAQ', link: '/faq' },
    ],
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Installation', link: '/getting-started/' },
          { text: 'Configuration', link: '/getting-started/configuration' },
        ],
      },
      {
        text: 'Scripts',
        items: [
          { text: 'helix_lib', link: '/scripts/helix-lib' },
          { text: 'helix_hud', link: '/scripts/helix-hud' },
          { text: 'helix_npc', link: '/scripts/helix-npc' },
          { text: 'helix_economy', link: '/scripts/helix-economy' },
          { text: 'helix_crafting', link: '/scripts/helix-crafting' },
          { text: 'helix_dispatch', link: '/scripts/helix-dispatch' },
          { text: 'helix_missions', link: '/scripts/helix-missions' },
          { text: 'helix_devtools', link: '/scripts/helix-devtools' },
        ],
      },
      {
        text: 'Guides',
        items: [
          { text: 'Framework Bridge', link: '/guides/framework-bridge' },
          { text: 'Common Examples', link: '/guides/examples' },
        ],
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Exports', link: '/api/' },
          { text: 'Client Utilities', link: '/api/client-utils' },
          { text: 'Server Utilities', link: '/api/server-utils' },
          { text: 'NUI Components', link: '/api/nui-components' },
          { text: 'NUI Hooks', link: '/api/nui-hooks' },
          { text: 'MCP Tool Reference', link: '/scripts/helix-devtools-tools' },
          { text: 'FAQ', link: '/faq' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Helix-Scripts' },
    ],
    footer: {
      message: 'Built with care by Helix Scripts',
    },
    search: {
      provider: 'local',
    },
    editLink: {
      pattern: 'https://github.com/Helix-Scripts/.github/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },
})

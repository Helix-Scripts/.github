import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Helix Scripts',
  description: 'Documentation for Helix Scripts — premium FiveM resources',
  base: '/docs/',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/docs/logo.svg' }],
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started/' },
      { text: 'Scripts', link: '/scripts/helix-lib' },
      { text: 'API', link: '/api/' },
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
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'API', link: '/api/' },
          { text: 'FAQ', link: '/faq' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Helix-Scripts' },
    ],
    footer: {
      message: 'Built with ❤️ by Helix Scripts',
    },
    search: {
      provider: 'local',
    },
  },
})

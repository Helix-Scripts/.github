import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Helix Scripts',
  description: 'Premium FiveM resources built for serious servers.',
  base: '/',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#7c3aed' }],
    ['meta', { property: 'og:title', content: 'Helix Scripts — Premium FiveM Resources' }],
    ['meta', { property: 'og:description', content: 'Documentation for Helix Scripts — premium FiveM resources built for serious servers.' }],
  ],
  themeConfig: {
    logo: {
      dark: '/logo-dark.svg',
      light: '/logo-light.svg',
    },
    siteTitle: false,
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
        ],
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Exports', link: '/api/' },
          { text: 'MCP Tool Reference', link: '/scripts/helix-devtools-tools' },
          { text: 'FAQ', link: '/faq' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Helix-Scripts' },
      { icon: 'discord', link: 'https://discord.gg/helix' },
    ],
    footer: {
      message: 'Premium FiveM resources.',
      copyright: '\u00A9 2026 Helix Scripts',
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

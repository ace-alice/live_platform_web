import { VitePWA } from 'vite-plugin-pwa'

export default function createVitePWA() {
  return VitePWA({
    registerType: 'autoUpdate',
    injectRegister: 'auto',
    devOptions: {
      enabled: true
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,svg}']
    },
    manifest: {
      name: 'Live Platform',
      short_name: 'Live',
      description: '为用户提供优质的内容',
      theme_color: '#000000',
      start_url: '/',
      icons: [
        {
          src: 'pwa/pwa-svg-64.svg',
          sizes: '64x64',
          type: 'image/x-icon'
        },
        {
          src: 'pwa/pwa-svg-32.svg',
          sizes: '32x32',
          type: 'image/x-icon'
        },
        {
          src: 'pwa/pwa-svg-24.svg',
          sizes: '24x24',
          type: 'image/x-icon'
        },
        {
          src: 'pwa/pwa-svg-16.svg',
          sizes: '16x16',
          type: 'image/x-icon'
        },
        {
          src: 'pwa/pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: 'pwa/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: 'pwa/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: 'pwa/pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png'
        },
        {
          src: 'pwa/apple-startup-1024x1024.png',
          sizes: '1024x1024',
          type: 'image/png',
          purpose: 'startup'
        }
      ]
    }
  })
}

import { VitePWA } from 'vite-plugin-pwa'

export default function createVitePWA() {
  return VitePWA({
    manifest: {
      name: 'IA E SPORT',
      short_name: 'IA',
      description: 'IA E SPORT',
      theme_color: '#262d34',
      icons: [
        // 添加图标， 注意路径和图像像素正确
        {
          src: 'favicon.ico',
          sizes: '114x97',
          type: 'image/png',
        },
      ],
    },
    registerType: 'autoUpdate',
    workbox: {
      // 缓存相关静态资源
      globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      runtimeCaching: [{
        // 由于要测试第三方API， 这里配置缓存访问第三方API的资源
        handler: 'CacheFirst',
        urlPattern: /^https:\/\//,
        // 注意，要修改成要测试的API。请使用正则表达式匹配
        method: 'GET',
        options: {
          cacheName: 'ia-esport',
          // 创建缓存名称
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365,
            // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      }],
    },
  })
}

import { createHtmlPlugin } from 'vite-plugin-html'
import { ref } from 'vue'

export default function createHtml(env: any, isBuild: boolean) {
  const { VITE_APP_TITLE } = env
  if (isBuild) {
    //
  }
  // const loadingScript = ''
  return createHtmlPlugin({
    inject: {
      data: {
        title: VITE_APP_TITLE
      },
      tags: [
        // {
        //   injectTo: 'head',
        //   tag: 'link',
        //   attrs: {
        //     ref: 'stylesheet',
        //     href: 'https://cdn.jsdelivr.net/npm/swiper@11.1.3/swiper-bundle.min.css'
        //   }
        // },
        // {
        //   injectTo: 'head',
        //   tag: 'script',
        //   attrs: {
        //     id: 'swiper-script',
        //     src: 'https://cdn.jsdelivr.net/npm/swiper@11.1.3/swiper-bundle.min.js'
        //   }
        // }
      ]
    },
    minify: isBuild
  })
}

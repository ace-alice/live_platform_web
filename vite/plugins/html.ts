import { createHtmlPlugin } from 'vite-plugin-html'

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
        //   tag: 'script',
        //   attrs: {
        //     id: 'axios-script',
        //     src: 'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js'
        //   }
        // }
      ]
    },
    minify: isBuild
  })
}

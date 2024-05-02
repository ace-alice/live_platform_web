import { createHtmlPlugin } from 'vite-plugin-html'

export default function createHtml(env, isBuild) {
  const { VITE_APP_TITLE } = env
  if (isBuild) {
    //
  }
  // const loadingScript = ''
  return createHtmlPlugin({
    inject: {
      data: {
        title: VITE_APP_TITLE,
      },
    },
    minify: isBuild,
  })
}

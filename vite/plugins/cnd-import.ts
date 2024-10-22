import { cdn } from 'vite-plugin-cdn2'
import { cdnjs } from 'vite-plugin-cdn2/resolver/cdnjs'

export default function cdnImport(command: any) {
  return cdn({
    modules: ['vue', 'vue-demi', 'vue-router', 'vue-i18n', 'pinia', 'element-plus', 'axios'],
    apply: command,
    resolve: cdnjs()
  })
}

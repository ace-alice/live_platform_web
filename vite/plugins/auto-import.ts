import autoImport from 'unplugin-auto-import/vite'
// import { VueRouterAutoImports } from 'unplugin-vue-router' // 帮助简化 Vue Router 的使用

export default function createAutoImport() {
  return autoImport({
    imports: [
      'vue',
      'vue-router',
      'pinia'
      // VueRouterAutoImports,
      // {
      //   'vue-router/auto': ['useLink']
      // }
    ],
    dts: './src/types/auto-imports.d.ts',
    dirs: ['../../src/utils/composables/**']
  })
}

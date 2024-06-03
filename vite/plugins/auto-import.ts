import autoImport from 'unplugin-auto-import/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
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
    // resolvers: [ElementPlusResolver()],
    dts: 'src/types/auto-imports.d.ts',
    include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
  })
}

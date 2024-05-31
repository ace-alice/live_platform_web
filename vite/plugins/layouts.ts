import Layouts from 'vite-plugin-vue-layouts'

export default function createLayouts() {
  return Layouts({
    layoutsDirs: 'src/layouts',
    pagesDirs: 'src/pages',
    defaultLayout: 'default',
    importMode: () => 'async'
  })
}

// 在页面中指定要使用的布局
// <route lang="yaml">
// meta:
//   layout: layout1
// </route>
// 注意：这里根据需要指定模具的名称，对于使用默认布局的页面可以不添加。

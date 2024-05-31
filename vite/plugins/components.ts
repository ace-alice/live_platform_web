import components from 'unplugin-vue-components/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function createComponents() {
  return components({
    dirs: ['src/components', 'element-plus'],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    dts: '../../src/types/components.d.ts'
    // resolvers: [ElementPlusResolver()] // 集成 element-plus
  })
}

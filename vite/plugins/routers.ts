import VueRouter from 'unplugin-vue-router/vite'

export default function () {
  return VueRouter({ extensions: ['.vue', '.md'], dts: 'src/types/typed-router.d.ts' })
}

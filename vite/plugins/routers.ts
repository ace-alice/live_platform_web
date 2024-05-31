import VueRouter from 'unplugin-vue-router/vite'

export default function () {
  return VueRouter({ extensions: ['.vue', '.md'], dts: '../../typed-router.d.ts' })
}

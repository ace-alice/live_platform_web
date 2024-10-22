import createAutoImport from './plugins/auto-import'
import createComponents from './plugins/components'
import createBanner from './plugins/banner'
import createHtml from './plugins/html'
import createCompression from './plugins/compression'
import VueDevTools from 'vite-plugin-vue-devtools'
import createSetupExtend from './plugins/setup-extend'
import esbuild from 'rollup-plugin-esbuild'
import createVitePWA from './plugins/VitePWA'
import createMkcert from './plugins/mkcert'
import createSvgIcon from './plugins/svg-icon'
import cdnImport from './plugins/cnd-import'
// import createLayouts from './plugins/layouts'

import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import createPages from './plugins/pages'
// import routers from './plugins/routers'

export default function createVitePlugins(
  viteEnv: Record<string, string>,
  isBuild = false,
  command: any
) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // routers(),
    vue(),
    vueJsx(),
    VueDevTools(),
    !isBuild &&
      esbuild({
        include: /\.[jt]sx?$/, // default
        exclude: /node_modules/, // default
        minify: false,
        // target: 'default', // default, or 'es20XX', 'esnext'
        define: { __VERSION__: '"xyz"' }
      })
  ]
  // 入口文件注入内容
  vitePlugins.push(createHtml(viteEnv, isBuild))
  // 打包输出压缩文件
  isBuild && vitePlugins.push(createCompression(viteEnv))
  // 开启https服务
  !isBuild && vitePlugins.push(createMkcert())
  // 自动导入
  vitePlugins.push(createAutoImport())
  // 自动导入组件模块
  vitePlugins.push(createComponents())
  // setup模块语言扩展
  vitePlugins.push(createSetupExtend())
  // 注册使用svg雪碧图
  vitePlugins.push(createSvgIcon(isBuild))
  // 自动配置模版
  // vitePlugins.push(createLayouts())
  // 自动配置路由
  // vitePlugins.push(createPages())
  // 创建 banner
  vitePlugins.push(createBanner())
  // 脱离浏览器而显示为一个独立程序的样子使用
  vitePlugins.push(createVitePWA())

  // cdn引入
  isBuild && vitePlugins.push(cdnImport(command))

  return vitePlugins
}

import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import dayjs from 'dayjs'
import pkg from './package.json'
import createVitePlugins from './vite'

// https://vitejs.dev/config/
export default ({ mode, command }: any) => {
  const env = loadEnv(mode, process.cwd())
  // 全局 scss 资源
  const scssResources: string[] = []

  return defineConfig({
    // base: '/',
    // 开发服务器选项 https://cn.vitejs.dev/config/#server-options
    server: {
      open: true,
      port: 9010,
      proxy: {
        '/proxy': {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: command === 'serve' && env.VITE_OPEN_PROXY === 'true',
          rewrite: (path) => path.replace(/\/proxy/, '')
        },
        '/api': {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/\/api/, '')
        },
        '/socket': {
          target: env.VITE_APP_SOCKET_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/\/socket/, '')
        }
      }
    },
    // 构建选项 https://cn.vitejs.dev/config/#server-fsserve-root
    build: {
      minify: 'terser',
      outDir: `dist/${mode}`,
      sourcemap: env.VITE_BUILD_SOURCEMAP === 'true',
      target: ['es2015', 'ios11'],
      terserOptions: {
        compress: {
          drop_console: env.NODE_ENV !== 'fat', // 移除 console 输出
          drop_debugger: true, // 移除 debugger 语句
          pure_funcs: ['console.log'], // 移除指定函数调用
          passes: 2 // 压缩时进行多次优化传递
        },
        mangle: {
          properties: false // 防止混淆类名和属性名
        },
        format: {
          comments: false // 移除所有注释
        }
      }
      // rollupOptions: {
      //   external: ['axios'] // 这些库将不会打包进项目  配合 createHtmlPlugin中配置的cdn使用
      // }
    },
    define: {
      __SYSTEM_INFO__: JSON.stringify({
        pkg: {
          version: pkg.version,
          dependencies: pkg.dependencies,
          devDependencies: pkg.devDependencies
        },
        lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    },
    plugins: createVitePlugins(env, command === 'build' || command === 'build:all', command),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '#': path.resolve(__dirname, 'src/types')
        // 防止 Vite 打包这些库 修改项目中引入的地址 配合 createHtmlPlugin中配置的cdn使用
        // axios: 'https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js'
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: scssResources.join('')
        }
      }
    }
  })
}

// import fs from "node:fs";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import dayjs from "dayjs";
import pkg from "./package.json";
import createVitePlugins from "./vite/plugins";

// https://vitejs.dev/config/
export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  // 全局 scss 资源
  const scssResources = [];

  return defineConfig({
    base: "/",
    // 开发服务器选项 https://cn.vitejs.dev/config/#server-options
    server: {
      open: true,
      port: 9010,
      proxy: {
        "/proxy": {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: command === "serve" && env.VITE_OPEN_PROXY === "true",
          rewrite: (path) => path.replace(/\/proxy/, ""),
        },
        "/api": {
          target: env.VITE_APP_API_BASEURL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/\/api/, ""),
        },
        "/socket": {
          target: env.VITE_APP_SOCKET_API,
          changeOrigin: true,
          rewrite: (path) => path.replace(/\/socket/, ""),
        },
      },
    },
    // 构建选项 https://cn.vitejs.dev/config/#server-fsserve-root
    build: {
      outDir: mode === "production" ? "gametob_pc" : `gametob_pc_${mode}`,
      sourcemap: env.VITE_BUILD_SOURCEMAP === "true",
      target: ["es2015", "ios11"],
    },
    define: {
      __SYSTEM_INFO__: JSON.stringify({
        pkg: {
          version: pkg.version,
          dependencies: pkg.dependencies,
          devDependencies: pkg.devDependencies,
        },
        lastBuildTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      }),
    },
    plugins: createVitePlugins(env, command === "build"),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "#": path.resolve(__dirname, "src/types"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: scssResources.join(""),
        },
      },
    },
  });
};

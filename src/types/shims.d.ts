declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'xgplayer-hls.js'

declare module 'xgplayer-flv.js'

declare const __SYSTEM_INFO__: {
  pkg: {
    version: string
    dependencies: Recordable<string>
    devDependencies: Recordable<string>
  }
  lastBuildTime: string
}

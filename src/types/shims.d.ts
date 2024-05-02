declare interface Window {
  webkitDevicePixelRatio: any;
  mozDevicePixelRatio: any;
  // 是否存在无界
  __POWERED_BY_WUJIE__?: boolean;
  __WUJIE_PUBLIC_PATH__?: string;
  // 子应用mount函数
  __WUJIE_MOUNT: () => void;
  // 子应用unmount函数
  __WUJIE_UNMOUNT: () => void;
  // 子应用无界实例
  __WUJIE: { mount: () => void };
}

declare module "*.vue" {
  import { type DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "xgplayer-hls.js";

declare module "xgplayer-flv";

declare const __SYSTEM_INFO__: {
  pkg: {
    version: string;
    dependencies: Recordable<string>;
    devDependencies: Recordable<string>;
  };
  lastBuildTime: string;
};

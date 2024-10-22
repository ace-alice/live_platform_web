// 全局声明扩展 Window 接口
declare global {
  interface Window {
    WebViewJSBridge: {
      callHandler: (handleName: string, data: { data: string }) => any
      registerHandler: (
        handleName: string,
        callBack: (data: any, success: Function, fail: Function) => any
      ) => any
      init: (options: { debug: boolean; channel: string[]; isFlutterInAppWebView: boolean }) => any
      unregisterHandler: (handleName: string) => void
    }
    WVJBCallbacks: any
  }
}

export default {}

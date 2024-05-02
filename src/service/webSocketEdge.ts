/* eslint-disable no-console */
export default function webSocketEdge() {
  const close = () => {
    console.log('连接失败')
  }
  // 断开连接
  const disconnect = (reason: any) => {
    console.log('断开连接-disconnect', reason)
  }
  // 错误
  const error = (err: any) => {
    console.log('错误-error', err)
  }
  // 连接错误
  const connectError = (err: any) => {
    console.log('连接错误-connect_error', err)
  }
  // 连接超时
  const connectTimeout = (data: any) => {
    console.log('连接超时-connect_timeout', data)
  }
  // 重连成功
  const reconnect = (attemptNumber: any) => {
    // 重连尝试次数
    console.log('重连成功-reconnect', attemptNumber)
  }
  // 尝试重连时触发
  const reconnectAttempt = (attemptNumber: any) => {
    // 重连尝试次数
    console.log('尝试重连-reconnect_attempt', attemptNumber)
  }
  // 在尝试重新连接时触发
  const reconnecting = (attemptNumber: any) => {
    // 重连尝试次数
    console.log('正在尝试重连-reconnecting', attemptNumber)
  }
  // 重连尝试错误
  const reconnectError = (err: any) => {
    console.log('重连尝试错误-reconnect_error', err)
  }
  // 客户端不能重连时触发
  const reconnectFailed = () => {
    console.log('客户端不能连接-reconnect_failed')
  }
  // 当一个ping被发送到服务器时触发
  const ping = () => {
    console.log('一个ping发送到服务器-ping')
  }

  // 当服务器收到pong时触发
  const pong = (data: any) => {
    // data: 延迟多少ms
    console.log('服务器收到pong-pong', data)
  }

  const joinRoomCallBack = (data: any) => {
    console.log(data)
  }

  const leaveRoomCallBack = (data: any) => {
    console.log(data)
  }

  return {
    close,
    disconnect,
    error,
    connectError,
    reconnectFailed,
    reconnectError,
    reconnectAttempt,
    reconnecting,
    reconnect,
    connectTimeout,
    ping,
    pong,
    joinRoomCallBack,
    leaveRoomCallBack,
  }
}

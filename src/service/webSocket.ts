// noinspection JSIgnoredPromiseFromCall
import io from "socket.io-client";
import { useRoute } from "vue-router";
import webSocketEdge from "@/service/webSocketEdge";
import { getLocal } from "@/utils/storage";
interface DataType {
  room_type: string;
  message_type: string;
  content: any;
}

export function socketServiceHook(proxy?: any) {
  const {
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
  } = webSocketEdge();

  const socket = io(import.meta.env.VITE_APP_SOCKET_API, {
    transports: ["websocket"],
    auth: {
      token: getLocal("token") || "123",
    },
  });

  const route = useRoute();

  socket.on("ping", ping);
  socket.on("pong", pong);
  socket.on("close", close);
  socket.on("connect", initRoomConnect);
  socket.on("disconnect", disconnect);
  socket.on("connect-error", connectError);
  socket.on("error", error);
  socket.on("reconnect-failed", reconnectFailed);
  socket.on("reconnect-error", reconnectError);
  socket.on("reconnect-attempt", reconnectAttempt);
  socket.on("reconnecting", reconnecting);
  socket.on("reconnect", reconnect);
  socket.on("connect-timeout", connectTimeout);
  socket.on("joinRoomCallBack", joinRoomCallBack);
  socket.on("leaveRoomCallBack", leaveRoomCallBack);
  socket.on("roomMessageCallBack", roomMessageCallBack);

  /**
   * @description 加入房间
   * @param room_type 房间类型
   * @param handicap_id 房间id
   * */
  function joinRoom(room_type: string, handicap_id?: number) {
    if (!socket.connected) {
      return;
    }
    socket.emit("RoomJoin", {
      room_type,
      handicap_id,
    });
  }

  /**
   * @description 离开房间
   * @param room_type 房间类型
   * @param handicap_id 房间id
   * */
  function leaveRoom(room_type: string, handicap_id?: number) {
    if (!socket.connected) {
      return;
    }
    socket.emit("RoomLeave", {
      room_type,
      handicap_id,
    });
  }

  /**
   * @description 初始化房间连接
   * */
  function initRoomConnect() {
    joinRoom("room_type_index_content_push");
  }

  /**
   * @description 接收信息后的操作
   * @param data {type:DataType} 推送的数据
   * */
  function roomMessageCallBack(data: DataType) {
    if (!data.content) {
      return;
    }
    const contentData = data.content;
    switch (data.message_type) {
      // 赔率推送
      case "message_type_push_point_change":
        // push_point_change(contentData);
        break;

      default:
      //
    }
  }

  return { joinRoom, leaveRoom };
}

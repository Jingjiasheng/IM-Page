import { createServer } from "http";

import type { connection, request } from "websocket";
import { server as WsServer } from "websocket";

import { connections, rooms } from "../bin/www";
import { breoadCast } from "../util/breoad_cast";
import type { Message } from "../util/message";
import { MessageType } from "../util/message";
import { getUserCurrentRoom, getUserFinger, getUserNicknameByCon } from "../util/query";
import { removeCon, removeUserFromRoom } from "../util/remove_con";

const startWsServer = (): void => {

  const ws_http_server = createServer((request, response) => {
    console.log((new Date()).toISOString() + " WS HTTP 服务收到请求: " + request.url);
    response.writeHead(404);
    response.end();
  });

  ws_http_server.listen(
    5151,
    () => {
      console.log((new Date()).toISOString() + "Ws http 服务启动成功并监听在 5151 端口!");
    }
  );

  // 创建socket服务对象
  const ws_server = new WsServer({
    httpServer: ws_http_server,
    maxReceivedFrameSize: 100000000,
    maxReceivedMessageSize: 100000000,
    autoAcceptConnections: true
  });

  // 创建客户端连接策略
  const _originIsAllowed = (_origin: string): boolean => true;

  ws_server.on("connect", (client: connection) => {

    connections.set(client, null);

    // 客户端监听正常消息事件
    client.on("message", message => {
      if (message.type === "utf8") {
        let r_msg: Message;
        try {
          r_msg = JSON.parse(message.utf8Data);
          switch (r_msg.type) {
            case MessageType.IMG:
              breoadCast(r_msg);
              break;
            case MessageType.NORMAL:
              breoadCast(r_msg);
              break;
            case MessageType.SET_NEW_CON:
              connections.get(client) ? void 0 : connections.set(client, getUserFinger(r_msg.nick_name!));
              //如果 default room 存在用户连接
              if (!rooms.get("default-room")!.has(getUserFinger(r_msg.nick_name!))) {
                const room = rooms.get("default-room")!;
                room.set(getUserFinger(r_msg.nick_name!), client);
              }
              breoadCast(r_msg);
              break;
            case MessageType.SWITCH_ROOM:
              // 将用户从已有的房间清除
              removeUserFromRoom(getUserFinger(r_msg.nick_name!));
              // 将用户加入目标房间
              rooms.has(r_msg.target) ?
                // - 存在,直接加入
                rooms.get(r_msg.target)!.set(getUserFinger(r_msg.nick_name!), client) :
                // - 不存在, 创建并加入
                rooms.set(r_msg.target, new Map<string, connection>().set(getUserFinger(r_msg.nick_name!), client));
              breoadCast({
                nick_name: MessageType.SYSTEM,
                type: MessageType.SYSTEM,
                content: `Welcome new user: ${r_msg.nick_name} joined us!`,
                target: r_msg.target
              });
              break;
            case MessageType.SYSTEM:
              break;
          }
        }
        catch (error) {
          console.log("无法将消息作为JSON对象进行解析:", message);
        }
      }
      else {
        console.log("无法使用utf-8字符集解析消息体:", message);
      }
    });
    // 监听客户端异常错误事件
    client.on("error", (error) => {
      // 打印错误日志
      console.log("监听到客户端发生连接错误事件:",error);
      // 由系统先广播到特定的房间当中
      const nick_name = getUserNicknameByCon(client);
      const finger = getUserFinger(nick_name!);
      breoadCast({
        nick_name: nick_name,
        type: MessageType.SYSTEM,
        content: `${nick_name} 客户端发生未知错误!`,
        target: getUserCurrentRoom(finger)
      });
      // 将异常连接从连接总表当中剔除 将移除连接从特定房间当中剔除
      removeCon(finger);
    });
    // 监听客户端断开连接事件
    client.on("close", (code, desc) => {
      // 打印错误日志
      console.log("监听到客户端发生连接关闭事件[错误码,错误详情]: ",code, desc);
      // 由系统先广播到特定的房间当中
      const nick_name = getUserNicknameByCon(client);
      const finger = getUserFinger(nick_name!);
      breoadCast({
        nick_name: nick_name,
        type: MessageType.SYSTEM,
        content: `${nick_name} 客户端意外断开!`,
        target: getUserCurrentRoom(finger)
      });
      // 将异常连接从连接总表当中剔除 将移除连接从特定房间当中剔除
      removeCon(finger);
    });
  });
  ws_server.on("close", (_connect, _reson, desc) => {
    console.log(`监听到 WSS [服务器/客户端] 断开事件: ${desc}!`);
  });
  ws_server.on("request", (req: request) => {
    console.log("监听到 WSS 服务器请求事件: ", req);
  });
  console.log("WSS 服务器在端口: 5151 上启动成功!");
};

export { startWsServer };

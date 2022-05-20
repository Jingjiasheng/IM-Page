import type { connection } from "websocket";

import { rooms } from "../bin/www";

import type { Message } from "./message";
import { MessageType } from "./message";
import { removeCon } from "./remove_con";

// 广播消息
const breoadCast = (message: Message): void => {
  try {
    const room = rooms.get(message.target);
    // 如果对应的房间存在, 则直接执行发送
    if (room && room.size > 0) {
      room.forEach((connect, finger) => {
        // 移除已经断开的客户端
        connect.connected ? void 0 : removeCon(finger);
        connect.sendUTF(
          JSON.stringify(message),
          // 当发送过程中发生错误同样移除连接
          (error) => {
            if (error) {
              removeCon(finger);
              console.log("广播过程中发生未知错误: ", error?.message);
            }
          }
        );
      });
    }
    // 如果对应的房间不存在, 则需要进行创建并初始化[default room 已经进行默认用户的加入操作,此处不进行重复添加]
    else {
      // const current_finger = getUserFinger(message.nick_name!);
      // const current_connection: connection = getConnection(current_finger);
      rooms.set(
        // 创建目标房间
        message.target,
        // 创建房间连接池
        new Map<string, connection>()/*.set(current_finger, current_connection)*/
      );
    }
    console.log(`广播消息: ${message.nick_name} 向 ${message.target} 发送了 ${message.type
    } 类型的消息: ${message.type === MessageType.IMG ? "" : message.content } `);
  }
  catch (e) {
    console.log("广播消息发生未知错误:", e.message);
  }


};

export { breoadCast };

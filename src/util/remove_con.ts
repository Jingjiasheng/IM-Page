import type { connection } from "websocket";

import { connections, rooms, users } from "../bin/www";

import { breoadCast } from "./breoad_cast";
import { MessageType } from "./message";

const removeCon = (finger: string): void => {
  let con: connection | null;
  // 循环查找用户在所以房间当中存在的连接, 移除之,并在房间内广播
  rooms.forEach((cons, room_name) => {
    if (cons.has(finger)) {
      con = cons.get(finger) ?? null;
      cons.delete(finger);
      breoadCast({
        nick_name: users.get(finger) ?? null,
        type: MessageType.SYSTEM,
        content: `${users.get(finger)} aleardy leave chatting room!`,
        target: room_name
      });
    }
  });
  // 将错误的用户链接从总连接当中移除
  connections.delete(con!);
};

const removeUserFromRoom = (finger: string): void => {
  // 循环查找用户在所以房间当中存在的连接, 移除之,并在房间内广播
  rooms.forEach((cons, room_name) => {
    if (cons.has(finger)) {
      cons.delete(finger);
      breoadCast({
        nick_name: MessageType.SYSTEM,
        type: MessageType.SYSTEM,
        content: `${users.get(finger)} aleardy leave chatting room!`,
        target: room_name
      });
    }
  });
};

export { removeCon, removeUserFromRoom };

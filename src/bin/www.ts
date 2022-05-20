import type { connection } from "websocket";

import { startHttpServer } from "../init/init_http";
import { startWsServer } from "../init/init_wss";


// 内存存储部分
// 存储所以用户, 组成:<指纹,用户名>
const users: Map<string, string> = new Map();
// 存储所有活着的socket链接 组成: <指纹, 链接对象>
const connections: Map<connection, string | null > = new Map();
// 存储所有的房间信息, 组成: <房间名, 用户集合<指纹, 链接对象>>
const rooms: Map<string, Map<string, connection>> =
  // 需要初始化一个默认的房间
  new Map().set("default-room",
    new Map<connection, string>());

startHttpServer();
startWsServer();

export {
  users, connections, rooms 
};

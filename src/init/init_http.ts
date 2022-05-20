import { createServer } from "http";
import path from "path";

import { json } from "body-parser";
import express from "express";
import type { Application } from "express";
import cors from "cors";

import { users } from "../bin/www";

const startHttpServer = (): void => {
  // http 服务部分
  const app: Application = express();
  app.use(cors());
  const jsonBody = json();
  // 设置静态资源目录
  app.use(express.static(path.join(__dirname,"../../public")));
  // 设置页面视图模板
  app.set("view engine", "ejs");
  // 访问项目根目录渲染页面
  app.get("/", express.static(path.join(__dirname,"../../public")));
  // 机制 1 当用户上线的时候根据用户的设备指纹尝试恢复用户信息
  app.post("/getUser", jsonBody, (req, res, _next) => {
    const finger = req.body.finger as string;
    console.log(new Date().toISOString(), "http: 查询指纹:", finger);
    return res.status(200).json({ nick_name: users.get(finger) ?? null });
  });
  // 机制 2 当用户上线的时候根据用户的设备指纹尝试恢复用户信息
  app.post("/setNewUser", jsonBody, (req, res, _next) => {
    const finger = req.body.finger as string;
    const nick_name = req.body.nick_name as string;
    console.log(new Date().toISOString(), "http:", "指纹: ",finger," 用户: ", nick_name);
    users.set(finger, nick_name);
    return res.status(200).json({ nick_name: nick_name });
  });
  const http_server = createServer(app);
  http_server.listen(Number(process.env.HTTP_PORT ?? "5050"));
  console.log("http 服务在 5050 端口启动成功!");
};


export { startHttpServer };

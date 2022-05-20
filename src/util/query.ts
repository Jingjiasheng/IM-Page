import type { connection } from "websocket";

import { connections, rooms, users } from "../bin/www";

const getUserFinger = (nickname: string): string => {
  let current_finger = "";
  users.forEach((nick_name, finger) => {
    if (nick_name === nickname) {
      current_finger = finger;
    }
  });
  return current_finger;
};

const getConnection = (current_finger: string): connection => {
  let current_connection: connection;
  connections.forEach((finger, connection) => {
    if (current_finger === finger) {
      current_connection = connection;
    }
  });
  return current_connection!;
};

const getUserNicknameByCon = (con: connection): string | null =>
  users.get(connections.get(con)!) ?? null;


const getUserCurrentRoom = (finger: string): string => {
  let roomname = "";
  rooms.forEach((room, room_name) => {
    if (room.has(finger)) {
      roomname = room_name;
    }
  });
  return roomname;
};


export {
  getUserFinger, getConnection, getUserNicknameByCon, getUserCurrentRoom
};

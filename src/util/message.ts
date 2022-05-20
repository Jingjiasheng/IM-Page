// who say what to whom

class Message{
  nick_name: string | null;

  type: MessageType;

  content: string;

  target: string;
}

enum MessageType{
  SET_NEW_CON = "set_new_con",
  SWITCH_ROOM = "switch_room",
  NORMAL = "normal",
  IMG = "img",
  SYSTEM = "system",
}

export { Message, MessageType };

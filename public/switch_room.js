const switchRoom = (room_name) => {
    localStorage.setItem("room_name", room_name)
    // 发送特殊的消息给服务器
    /**
     * {
     *      nick_name: "zhangsan",
     *      type: "Command",
     *      content: "Switch Room",
     *      target: "聊天室001"
     * }
     */
    sendMessage(
        "switch_room",
        "Switch Room",
        localStorage.getItem("room_name")
    );

    // 清除当前的消息记录
    clear_message();
    // 切换完成提示
    showTips(switch_complate);
    // 切换 title 到当前 room-name
    $(document).attr("title", localStorage.getItem("room_name"));

}

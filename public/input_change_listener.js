// 监听输入框,时刻判断用户输入内容 [变色,特殊符号]
$('.text_area').bind('keyup', event => {
    let input = $('.text_area').text();
    if (input.charAt(0)===">") {
        // 执行输入命令操作
        $('.text_area').css("text-shadow","0px 0px 0px rgb(0, 225, 255)")
        const command = input.toLowerCase().replaceAll(" ", "").split(":")[0]
        switch (command) {
            case ">showlogs":
                // Exec Synchronous chats
                showTips(show_logs);
                break;
            case ">setnickname":
                // Exec Synchronous chats
                showTips(please_set_nick_name);
                break;
            case ">sendimg":
                // Exec send an asicc image
                showTips(send_img);
                break;
            case ">switchroom":
                // Exec switch chat room
                showTips(switch_room);
                break;
            case ">changebg":
                // Exec switch chat room
                showTips(change_db);
                break;
            case ">exit":
                // Exec exit current room and switch to default room
                showTips(exit_room);
                break;
            case ">clear":
                // Exec clear current room all chatting messages
                showTips(clear_messages);
                break;
            default:
                // alert error log: wrong or not support command
                showTips(error_command);
                break;
        }
    } else {
        showTips(normal_message);
        $('.text_area').css("text-shadow","0px 0px 0px rgb(255, 255, 255)")
    }
    // If click Enter buttom
    if (event.keyCode == "13") {
        // send message to server
        if (input.charAt(0) !== ">") {
            // Can not to send empty message
            if (typeof input === "string") {
                if (input === "") {
                    input = $('.text_area').find("img")
                    if (input.length === 0) {
                        showTips(empty_message)
                    } else {
                        for (const img of input) {
                            sendMessage("img", img.getAttribute("src"), localStorage.getItem("room_name"))
                        }
                    }
                } else {
                    sendMessage("normal", input, localStorage.getItem("room_name"))
                }
            }
        }
        // exec command
        else {
            const command = input.toLowerCase().replaceAll(" ", "").split(":")[0]
            switch (command) {
                case ">showlogs":
                    // Exec Synchronous chats
                    break;

                case ">setnickname":
                    // Exec Synchronous chats
                    const input_nick_name = input.split(":")[1]
                    if (input_nick_name === "") {
                        showTips(nick_name_empty)
                    } else {
                        setNickName(input.split(":")[1])
                    }
                    break;

                case ">sendimg":
                    // 执行本地文件上传
                    $("#upload_file").click()
                    break;

                case ">switchroom":
                    // Exec switch chat room
                    const room_name = input.split(":")[1]
                    if (room_name === "") {
                        showTips(room_name_empty)
                    } else {
                        // 执行切换房间
                        switchRoom(room_name);
                    }
                    break;
                case ">changebg":
                    // Exec change chat room background imgs
                    const bg_name = input.split(":")[1]
                    if (bg_name === "") {
                        changeBg("def");
                    } else {
                        // 执行切换房间背景
                        changeBg(bg_name);
                    }
                    break;

                case ">exit":
                    // 退出当前房间到默认房间
                    switchRoom("default-room");
                    break;

                case ">clear":
                    // 清除当前界面的所有的聊天内容
                    clear_message();
                    break;

                default:
                    // 显示错误的命令提示
                    showTips(error_command);
                    break;
            }
        }
        // 清除输入框中的所有的内容
        $('.text_area').text("")
    }

});


// 全局点击焦点强制聚焦
$(".content_div").click(() => {
    $(".text_area").focus()
});
$("body").click(() => {
    $(".text_area").focus()
});

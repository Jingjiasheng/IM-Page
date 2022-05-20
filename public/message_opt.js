// 发送消息到WSS服务器
const sendMessage = (type, content, room_name) => {
    if (ws === undefined) {
        showTips(please_set_nick_name);
    } else {
        ws.send(
            JSON.stringify({
            nick_name: localStorage.getItem("nick_name"),
            type: type,
            content: content,
            target: room_name
            })
        );
        showTips(already_send);
    }
}


// 清除消息记录
const clear_message = () => {
    // append message to the screen for the moment
    $(".content_div").empty()
    $(".content").scrollTop($(".content")[0].scrollHeight);
    showTips(clear_complate);
}

// 拼接普通消息
const appendMessage = (talk_man, message) => {

    const avatar = genAvatarByName(talk_man);

    $(".content_div")
        .append(`<br><span>${new Date().toISOString()}  ${talk_man}<br>${avatar}: ${message}</span>`)
    $(".content").scrollTop($(".content")[0].scrollHeight);
    showTips(revice_message);
}

// 拼接图片消息
const appendImg = (talk_man, image_base64) => {
    // append img message to the screen for the moment
    $(".content_div").append(
        "<br><span>" + new Date().toISOString() + "  " + talk_man + "<br>" +
        "<img style='width:50%;object-fit: cover;' src='" + image_base64 + "' /></span>"
    )
    $(".content").scrollTop($(".content")[0].scrollHeight);
}

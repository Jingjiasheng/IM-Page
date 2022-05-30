const initWs = () => {
    Push.create('Welcome!');
    // ws = new WebSocket("wss://ws.automan.vip");
    ws = new WebSocket("ws://192.168.10.21:5151");

    // readyState属性返回实例对象的当前状态，共有四种。
    // CONNECTING：值为0，表示正在连接。
    // OPEN：值为1，表示连接成功，可以通信了。
    // CLOSING：值为2，表示连接正在关闭。
    // CLOSED：值为3，表示连接已经关闭，或者打开连接失败
    // 例如：if (ws.readyState == WebSocket.CONNECTING) { }

    //【用于指定连接成功后的回调函数】
    ws.onopen = (evt) => {
        sendMessage("set_new_con", `Welcome New Friends: ${localStorage.getItem("nick_name")} Joined us`, "default-room");
        localStorage.setItem("room_name", "default-room");
        showTips(init_wss_complate);
    };
    // [【于指定连接关闭后的回调函数。】
    ws.onclose = (evt) => {
        showTips(server_close);
    };
    // webSocket.onerror 用于指定报错时的回调函数
    ws.onerror = (evt) => {
        showTips(server_error);
    };

    //【用于指定收到服务器数据后的回调函数】
    //【服务器数据有可能是文本，也有可能是二进制数据，需要判断】
    ws.onmessage = (event) => {
        // if (typeof event.data === String) {
        const message = JSON.parse(event.data);
        if (page_close) {
            showNotification(message.nick_name, message.content);
        }
        message.type === "img" ?
            appendImg(message.nick_name, message.content) :
            appendMessage(message.nick_name, message.content);
        // }

        // if (event.data instanceof ArrayBuffer) {
        //   var buffer = event.data;
        //   console.log("Received arraybuffer");
        // }
        // ws.close();
    };
};


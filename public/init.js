let ws;

const avatars = [
    "😇", "🤪", "😜", "😏", "🤠", "🥸", "😎", "😈", "👻", "🦊",
    "🦁", "🦝", "🦁", "🐯", "🦄", "🐻", "🐲", "🦖", "🍒", "🍓"
];
let page_close = false;

// 注册用户离开和返回页面触发函数
window.onblur = () => {
    page_close = true;
  }

window.onfocus = () => {
    page_close = false;
}


import('https://openfpcdn.io/fingerprintjs/v3')
    .then(FingerprintJS => FingerprintJS.load())
    .then(fp => fp.get())
        .then(result => {
            finger = result.visitorId
            localStorage.setItem("finger", finger);
            $.ajax({
                //请求方式
                type: "post",
                contentType: "application/json;charset=utf-8",
                //请求的媒体类型
                dataType: "json",
                //请求地址
                url : "https://im.automan.vip/getUser",
                // url : "http://192.168.10.21:5050/getUser",
                //数据，json字符串
                data : JSON.stringify({ finger: finger }),
                //请求成功
                success : result => {
                    if (result.nick_name != null) {
                        localStorage.setItem("nick_name",result.nick_name)
                        showTips(welcome_user);
                        initWs()
                    } else {
                        localStorage.removeItem("nick_name")
                        showTips(please_set_nick_name);
                    }
                },
                //请求失败，包含具体的错误信息
                error: e => {
                    showTips(error_to_fetch_user_info);
                }
            });
        })



const setNickName = (name) => {
    $.ajax({
        //请求方式
        type : "POST",
        //请求的媒体类型
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        //请求地址
        url : "https://im.automan.vip/setNewUser",
        // url : "http://192.168.10.21:5050/setNewUser",
        //数据，json字符串
        data: JSON.stringify({
            finger: localStorage.getItem("finger"),
            nick_name: name
        }),
        //请求成功
        success : result => {
            if (result.nick_name != null) {
                localStorage.setItem("nick_name",result.nick_name)
                initWs()
            }
        },
        //请求失败，包含具体的错误信息
        error: e => {
            showTips(error_to_fetch_user_info);
        }
    });

}

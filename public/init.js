let ws;

const avatars = [
    "ð", "ð¤ª", "ð", "ð", "ð¤ ", "ð¥¸", "ð", "ð", "ð»", "ð¦",
    "ð¦", "ð¦", "ð¦", "ð¯", "ð¦", "ð»", "ð²", "ð¦", "ð", "ð"
];
let page_close = false;

// æ³¨åç¨æ·ç¦»å¼åè¿åé¡µé¢è§¦åå½æ°
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
                //è¯·æ±æ¹å¼
                type: "post",
                contentType: "application/json;charset=utf-8",
                //è¯·æ±çåªä½ç±»å
                dataType: "json",
                //è¯·æ±å°å
                // url : "https://im.automan.vip/getUser",
                url : "http://192.168.10.21:5050/getUser",
                //æ°æ®ï¼jsonå­ç¬¦ä¸²
                data : JSON.stringify({ finger: finger }),
                //è¯·æ±æå
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
                //è¯·æ±å¤±è´¥ï¼åå«å·ä½çéè¯¯ä¿¡æ¯
                error: e => {
                    showTips(error_to_fetch_user_info);
                }
            });
        })



const setNickName = (name) => {
    $.ajax({
        //è¯·æ±æ¹å¼
        type : "POST",
        //è¯·æ±çåªä½ç±»å
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        //è¯·æ±å°å
        // url : "https://im.automan.vip/setNewUser",
        url : "http://192.168.10.21:5050/setNewUser",
        //æ°æ®ï¼jsonå­ç¬¦ä¸²
        data: JSON.stringify({
            finger: localStorage.getItem("finger"),
            nick_name: name
        }),
        //è¯·æ±æå
        success : result => {
            if (result.nick_name != null) {
                localStorage.setItem("nick_name",result.nick_name)
                initWs()
            }
        },
        //è¯·æ±å¤±è´¥ï¼åå«å·ä½çéè¯¯ä¿¡æ¯
        error: e => {
            showTips(error_to_fetch_user_info);
        }
    });

}

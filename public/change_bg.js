const changeBg = (index) => {
    const body = $("body")
    const tip = $(".input_tips");
    const input = $(".text_area");
    switch (index) {
        case "0" :
            // 设置背景图片
            body.css("background-image", "url('./bgs/0.jpg')");
            // 消息记录字体颜色
            body.css("color", "#ff004d");
            // 提示信息颜色
            tip.css("text-shadow", "0px 0px 0px #4df4ff");
            // 输入行字体颜色
            input.css("color", "#4df4ff");
            break;
        case "1" :
            // 设置背景图片
            body.css("background-image", "url('./bgs/1.jpg')");
            // 除提示信息之外的背景色
            body.css("color", "#252a34");
            // 提示信息颜色
            tip.css("text-shadow", "0px 0px 0px #ff2e63");
            // 输入行光标颜色
            input.css("color", "#ff2e63");
            break;
        case "2" :
            // 设置背景图片
            body.css("background-image", "url('./bgs/2.jpg')");
            // 除提示信息之外的背景色
            body.css("color", "#ff4b5c");
            // 提示信息颜色
            tip.css("text-shadow", "0px 0px 0px #e0ece4");
            // 输入行光标颜色
            input.css("color", "#e0ece4");
            break;
        case "3" :
            // 设置背景图片
            body.css("background-image", "url('./bgs/3.jpg')");
            // 除提示信息之外的背景色
            body.css("color", "#08d9d6");
            // 提示信息颜色
            tip.css("text-shadow", "0px 0px 0px #ff2e63");
            // 输入行光标颜色
            input.css("color", "#ff2e63");
            break;
        case "4" :
            // 设置背景图片
            body.css("background-image", "url('./bgs/4.jpg')");
            // 除提示信息之外的背景色
            body.css("color", "#ddfee4");
            // 提示信息背景颜色
            tip.css("text-shadow", "0px 0px 0px #28cc9e");
            // 输入行光标颜色
            input.css("color", "#28cc9e");
            break;
        case "5" :
            // 设置背景图片
            body.css("background-image", "url('./bgs/5.jpg')");
            // 除提示信息之外的背景色
            body.css("color", "#189bfa");
            // 提示信息背景颜色
            tip.css("text-shadow", "0px 0px 0px #28cc9e");
            // 输入行光标颜色
            input.css("color", "#28cc9e");
            break;
        case "6" :
            // 设置背景图片
            body.css("background-image", "url('./bgs/6.jpg')");
            // 除提示信息之外的背景色
            body.css("color", "#00bbf0");
            // 提示信息背景颜色
            tip.css("text-shadow", "0px 0px 0px #d9faff");
            // 输入行光标颜色
            input.css("color", "#d9faff");
            break;
        case "7" :
            // 设置背景图片
            body.css("background-image", "url('./bgs/7.jpg')");
            // 除提示信息之外的背景色
            body.css("color", "#f21368");
            // 提示信息背景颜色
            tip.css("text-shadow", "0px 0px 0px #ffffff");
            // 输入行光标颜色
            input.css("color", "#ffffff");
            break;
        case "8" :
            // 设置背景图片
            body.css("background-image", "url('./bgs/8.jpg')");
            // 除提示信息之外的背景色
            body.css("color", "#45171d");
            // 提示信息背景颜色
            tip.css("text-shadow", "0px 0px 0px #c2faf1");
            // 输入行光标颜色
            input.css("color", "#c2faf1");
            break;
        case "9" :
            // 设置背景图片
            body.css("background-image", "url('./bgs/9.jpg')");
            // 除提示信息之外的背景色
            body.css("color", "#ff004d");
            // 提示信息背景颜色
            tip.css("text-shadow", "0px 0px 0px #4df4ff");
            // 输入行光标颜色
            input.css("color", "#4df4ff");
            break;
        case "def" :
            // 设置背景图片
            body.css("background-image", "");
            // 除提示信息之外的背景色
            body.css("background-color", "black");
            // 设置默认字体颜色
            body.css("color", "#ffffff");
            // 提示信息背景颜色
            tip.css("text-shadow", "0px 0px 0px rgb(0, 255, 255)");
            // 输入行字体颜色
            input.css("color", "rgb(0, 255, 255)");
            break;
    }
}

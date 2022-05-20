$('#upload_file').change(() => {
    var fileInput = $('#upload_file');
    var reader = new FileReader();
    reader.readAsDataURL(fileInput[0].files[0]);
    reader.onload = () => {
        sendMessage("img", reader.result, localStorage.getItem("room_name"));
    };
    reader.onerror = (error) => {
        showTips(load_img_error)
    };
});

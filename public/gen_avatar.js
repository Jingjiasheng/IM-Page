genAvatarByName = (name) => {
    const md5_name = "0x" + md5(name);
    return avatars[Math.floor(Number.parseInt(md5_name)/1e37)%20]
  }
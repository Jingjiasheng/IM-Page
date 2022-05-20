showNotification = (nick_name, message) => {
    Push.create(genAvatarByName(nick_name) + nick_name, {
      body: message,
      icon: '10.PNG',
      timeout: 5000,
      onClick: () => {
          window.focus();
          this.close();
      }
    });
  }
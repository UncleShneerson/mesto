export default class UserInfo {
  constructor ({nameSelector, aboutSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  };

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent
    };
    return userInfo;
  };

  setUserInfo({name, about, avatar, ...info}) {
    if (name) {this._name.textContent = name};
    if (about) {this._about.textContent = about};
    if (avatar) {this._avatar.src = avatar};
    this.info = info;
  };
}

export class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
    this.id = {};
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent,
    }
  }

  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileDescription.textContent = data.about;
    this.id = data._id;
  }
}

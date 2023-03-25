export class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
    this.id = {};
  }

  getUserInfo = (data) => {
    this._profileName.textContent = data.name;
    this._profileDescription.textContent = data.about;
    this.id = data._id;
  }

  getUserAvatar = (data) => {
    this._profileAvatar.src = data.avatar;
  }
}

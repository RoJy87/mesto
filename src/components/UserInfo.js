export class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileDescription = document.querySelector(descriptionSelector);
  }


  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    }
  }

  setUserInfo(userData) {
    this._profileName.textContent = userData['name'];
    this._profileDescription.textContent = userData['description'];
  }
}

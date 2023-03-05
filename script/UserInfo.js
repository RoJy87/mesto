export class UserInfo {
  constructor(userData) {
    this._profileName = userData.name;
    this._profileDescription = userData.description;
    this._nameInput = document.querySelector('.popup__input_value_name');
    this._jobInput = document.querySelector('.popup__input_value_status');
  }

  getUserInfo() {
    this._nameInput.setAttribute('value', this._profileName.textContent);
    this._jobInput.setAttribute('value', this._profileDescription.textContent);
  }

  setUserInfo() {
    this._profileName.textContent = this._nameInput.value;
    this._profileDescription.textContent = this._jobInput.value;
  }
}

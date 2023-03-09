import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({popupSelector, formSubmit}) {
    super(popupSelector);
    this._formSubmit = formSubmit.bind(this);
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._inputList.forEach((input) => {
      return input;
    })
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', this._formSubmit);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popupSelector.removeEventListener('submit', this._formSubmit);
  }

  close() {
    super.close();
    this._formReset();
  }

  _formReset() {
    this._formElement = this._popupSelector.querySelector('.form');
    this._formElement.reset();
  }
}

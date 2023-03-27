import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._submitHandlerListener = this._getInputValues.bind(this)
    this._formElement = this._popup.querySelector('.form');
    this._saveButton = this._popup.querySelector('.popup__save-btn');
    this._savebuttonText = this._saveButton.textContent;
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._saveButton.textContent = 'Сохранение...';
    } else {
      this._saveButton.textContent = this._savebuttonText;
    }
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    })
    return this._submitHandler(this._inputValues);
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  _setEventListeners() {
    super._setEventListeners();
    this._popup.addEventListener('submit', this._submitHandlerListener);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._popup.removeEventListener('submit', this._submitHandlerListener);
  }

  close() {
    super.close();
    setTimeout(() => this._formReset(), 1000);
  }

  _formReset() {
    this._formElement.reset();
  }
}

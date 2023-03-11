import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._submitHandlerListener = this._getInputValues.bind(this)
    this._formElement = this._popup.querySelector('.form');
    this._inputList = this._popup.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    })
    return this._submitHandler(this._inputValues);
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
    this._formReset();
  }

  _formReset() {
    this._formElement.reset();
  }
}

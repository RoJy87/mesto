import { Popup } from "./Popup";

export class PopupWithSubmit extends Popup {
  constructor({ popupSelector, submitHandler }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form-del');
    this._submitHandler = submitHandler;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._submitHandler)
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._submitHandler);
  }
}

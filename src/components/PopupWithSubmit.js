import { Popup } from "./Popup";

export class PopupWithSubmit extends Popup {
  constructor({ popupSelector, submitHandler }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form-del');
    this._submitHandler = submitHandler;
  }

  _submitHandlerClick = (evt) => {
    evt.preventDefault();
    this._submitHandler(this._element)
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit',  this._submitHandlerClick)
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._submitHandlerClick);
  }

  open(element) {
    super.open();
    this._element = element;
  }

}

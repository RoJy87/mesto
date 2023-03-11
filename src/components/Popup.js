import {page} from '../utils/constants.js';

export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleClickBind = this._handleClickClose.bind(this);
    this._handleEscBind = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._setEventListeners()
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
  }

  _handleClickClose(evt) {
    const targets = evt.target.classList;
    if (targets.contains('popup__close-btn')
      || targets.contains('popup')) {
        this.close();
    }
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _setEventListeners() {
    this._popup.addEventListener('mousedown', this._handleClickBind);
    page.addEventListener('keydown', this._handleEscBind);
  }

  _removeEventListeners() {
    this._popup.removeEventListener('mousedown', this._handleClickBind);
    page.removeEventListener('keydown', this._handleEscBind);
  }

}

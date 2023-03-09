export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleClickBind = this._handleClickClose.bind(this);
    this._handleEscBind = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
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

  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', this._handleClickBind);
    document.querySelector('.page').addEventListener('keydown', this._handleEscBind);
  }

  _removeEventListeners() {
    this._popupSelector.removeEventListener('mousedown', this._handleClickBind);
    document.querySelector('.page').removeEventListener('keydown', this._handleEscBind);
  }

}

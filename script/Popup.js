const ESC_BUTTON = 27;
export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add('popup_opened');
    this._setEventListeners();
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
    if (evt.keyCode === ESC_BUTTON) {
      this.close();
    }
  }

  _setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (evt) => {
      this._handleClickClose(evt)
    });
    document.querySelector('.page').addEventListener('keydown', (evt) => {
      this._handleEscClose(evt)
    });
  }

  _removeEventListeners() {
    this._popupSelector.removeEventListener('mousedown', (evt) => {
      this._handleClickClose(evt)
    });
    document.querySelector('.page').removeEventListener('keydown', (evt) => {
      this._handleEscClose(evt)
    });
  }

}

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = popupSelector.querySelector('.popup__photo');
    this._popupCaption = popupSelector.querySelector('.popup__caption');
  }

  open(name, link) {
    super.open();
    this._popupPhoto.alt = name;
    this._popupPhoto.src = link;
    this._popupCaption.textContent = name;
  }
}

export class PopupWithForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  _getInputValues() {

  }

  _setEventListeners() {
    super._setEventListeners();
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

import { Popup } from "./Popup.js";

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

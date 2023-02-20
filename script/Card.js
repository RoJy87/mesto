import { openModalWindow } from "./script.js";

const popupImage = document.querySelector('.popup_type_image');
const popupPhoto = document.querySelector('.popup__photo');
const caption = document.querySelector('.popup__caption');


export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const placeElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.places__items')
      .cloneNode(true);

    return placeElement;
  }

  // Добавляем активный клас кнопке лайк
  _addLike() {
    this._element.querySelector('.place__like-btn').classList.toggle('place__like-btn_active');
  }

  // Удаляем карточку
  _removeCard() {
    this._element.remove()
  };

  // Открываем popup с фото
  _openImage() {
    openModalWindow(popupImage);
    caption.textContent = this._name;
    popupPhoto.alt = this._name;
    popupPhoto.src = this._link;
  }

  // Навешиваем события
  _setEventListeners() {
    const deleteButton = this._element.querySelector('.place__delete-btn');
    const imageButton = this._element.querySelector('.place__img-btn');
    const likeButton = this._element.querySelector('.place__like-btn');

    likeButton.addEventListener('click', () => {
      this._addLike();
    })
    deleteButton.addEventListener('click', () => {
      this._removeCard();
    })
    imageButton.addEventListener('click', () => {
      this._openImage();
    })
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const placePhoto = this._element.querySelector('.place__photo');
    const placeName = this._element.querySelector('.place__name');

    placePhoto.src = this._link;
    placePhoto.alt = this._name;
    placeName.textContent = this._name;

    return this._element;
  }
}

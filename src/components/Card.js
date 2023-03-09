export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._likeButton.classList.toggle('place__like-btn_active');
  }

  // Удаляем карточку
  _removeCard() {
    this._element.remove()
  };

  // Навешиваем события
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._addLike();
    })
    this._deleteButton.addEventListener('click', () => {
      this._removeCard();
    })
    this._imageButton.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }

  createCardElement() {
    this._element = this._getTemplate();
    this._deleteButton = this._element.querySelector('.place__delete-btn');
    this._imageButton = this._element.querySelector('.place__img-btn');
    this._likeButton = this._element.querySelector('.place__like-btn');
    this._placePhoto = this._element.querySelector('.place__photo');
    this._placeName = this._element.querySelector('.place__name');

    this._setEventListeners();

    this._placePhoto.src = this._link;
    this._placeName.alt = this._name;
    this._placeName.textContent = this._name;

    return this._element;
  }
}

export class Card {
  constructor({data, handleCardClick, handleLikeClick, handleDeleteCardClick, templateSelector, myId }) {
    this._card = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._myId = myId;
  }

  _getTemplate() {
    const placeElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.places__items')
      .cloneNode(true);

    return placeElement;
  }

  isLikedChecker = (card) => {
    const likeId = card.likes.map(item => (item._id))
    if (likeId.includes(this._myId)) {
      return this._isLiked = true;
    } else {
      return this._isLiked = false;
    }
  }

  likeRender = (card) => {
    this.isLikedChecker(card)
    if (this._isLiked) {
      this._likeButton.classList.add('place__like-btn_active');
    } else {
      this._likeButton.classList.remove('place__like-btn_active');
    }
    this._likesCount.textContent = card.likes.length;
  }

  findCard(data) {
    return data.find(item => item._id === this.getId())
  }

  getId() {
    return this._cardId;
  };

  // Навешиваем события
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    if (this._myId !== this._ownerId) {
      this._deleteButton.remove();
    } else {
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteCardClick(this._element);
      });
    }

    this._imageButton.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }

  createCardElement() {
    this._element = this._getTemplate();
    this._element.id = this._cardId;
    this._deleteButton = this._element.querySelector('.place__delete-btn');
    this._imageButton = this._element.querySelector('.place__img-btn');
    this._likeButton = this._element.querySelector('.place__like-btn');
    this._likesCount = this._element.querySelector('.place__like-count');
    this._placePhoto = this._element.querySelector('.place__photo');
    this._placeName = this._element.querySelector('.place__name');

    this._placePhoto.src = this._link;
    this._placeName.alt = this._name;
    this._placeName.textContent = this._name;

    this.likeRender(this._card)

    this._setEventListeners();

    return this._element;
  }
}

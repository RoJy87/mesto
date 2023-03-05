export class Section {
  constructor({data, renderer}, createCard, containerSelector) {
    this._cards = data;
    this._renderer = renderer;
    this._createCard = createCard;
    this._container = document.querySelector(containerSelector);
  }

  renderElements() {
    this._cards.forEach((card) => {
      this._renderer(card, this._container);
    });
  }

  addItem(card) {
    this._cardElement = this._createCard(card);
    this._container.prepend(this._cardElement);
  }

}

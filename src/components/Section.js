export class Section {
  constructor({data, renderer}, containerSelector) {
    this._cards = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  createCard(element) {
    const card = new Card(element, '.places__template', handleCardClick);
    const cardElement = card.createCardElement();
    return cardElement;
  }

  renderElements() {
    this._cards.forEach((card) => {
      this._renderer(card);
    });
  }

  addItem(card) {
    this._container.prepend(card);
  }

}

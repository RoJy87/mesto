export class Section {
  constructor({ renderer, containerSelector, cardCreater }) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._createCard = cardCreater;
  }

  renderElements = (data) => {
    data.forEach((card) => {
      this._renderer(card);
    });
  }

  addItem(card) {
    this._container.prepend(this._createCard(card));
  }

}

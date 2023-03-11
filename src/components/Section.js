export class Section {
  constructor({data, renderer}, containerSelector) {
    this._cards = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
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

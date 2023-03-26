export class Section {
  constructor({ renderer, containerSelector }) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderElements = (data) => {
    data.forEach((card) => {
      this._renderer(card);
    });
  }

  addItem(card) {
    this._container.prepend(card);
  }

}

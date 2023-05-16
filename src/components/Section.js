export default class Section {
  constructor ({items, render}, selector) {
    this._itemsArray = items;
    this._render = render;
    this._container = document.querySelector(selector);
  };

  renderItems() {
    this._itemsArray.forEach(item => {
      this._render(item);
    });
  };

  addItem(item) {
    this._container.prepend(item);
  };
}

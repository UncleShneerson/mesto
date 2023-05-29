export default class Section {
  constructor ({render}, selector) {
    this._render = render;
    this._container = document.querySelector(selector);
  };

  renderItems(dataArray) {
    dataArray.forEach(item => {
      this._render(item);
    });
  };

  addItem(item) {
    this._container.prepend(item);
  };
}

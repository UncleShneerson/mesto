import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photo = this._container.querySelector('.gallery__photo');
    this._caption = this._container.querySelector('.gallery__caption');
  }

  open(data) {
    super.open();
    this._photo.src = data.src;
    this._photo.alt = data.alt;
    this._caption.textContent = data.alt;
  };
}

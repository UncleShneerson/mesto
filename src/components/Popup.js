export default class Popup {
  constructor (popupSelector) {
    this._container = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
  };

  open() {
    this._container.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

  close() {
    this._container.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._container.querySelector('.popup__btn-close').addEventListener('click', this.close);

    this._container.addEventListener('click', (evt) => {
      if (evt.currentTarget === evt.target) {
        this.close()
      };
    });
  }
}

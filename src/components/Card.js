// WEBPACK IMPORT
const errorImage = new URL('../images/place_holder.jpg', import.meta.url);

//СLASS
export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick) {
    this._text = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick.bind(this);
    this._likeIt = this._likeIt.bind(this)
    this._likeIt = this._likeIt.bind(this)

  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.places__card')
      .cloneNode(true);

    return cardElement;
  };

  generateCard() {
    this._element = this._getTemplate();
    this._cardName = this._element.querySelector('.places__name');
    this._cardImage = this._element.querySelector('.places__image');
    this._likeIcon = this._element.querySelector('.places__like');
    this._deleteIcon = this._element.querySelector('.places__delete');

    this._cardName.textContent = this._text;
    this._cardImage.alt = this._text;
    this._cardImage.src = this._image;

    this._setEventListeners(this._element);

    return this._element;
  };

  _setEventListeners () {
    this._likeIcon.addEventListener('click', this._likeIt);

    this._deleteIcon.addEventListener('click', this._handleDeleteClick);

    this._cardImage.addEventListener('error', () => {this._imageError()});

    this._cardImage.addEventListener('click', this._handleCardClick);
  };

  deleteCard() {
    this._element.remove();
  };

  _likeIt () {
    this._likeIcon.classList.toggle('places__like_active');
  };

  _imageError() {
    this._cardImage.src = errorImage;
    this._cardImage.classList.add('places__image_error');
    this._cardImage.removeEventListener('click', this._handleCardClick);
  };
};

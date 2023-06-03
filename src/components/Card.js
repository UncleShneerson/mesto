// WEBPACK IMPORT
const errorImage = new URL('../images/place_holder.jpg', import.meta.url);

//СLASS
export default class Card {
  constructor(data, templateSelector, userId, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._data = data;
    this._text = this._data.name;
    this._image = this._data.link;
    this._id = this._data._id;
    this._ownerId = this._data.owner._id;
    this._userId = userId;
    this._likesArray = data.likes;
    this._templateSelector = templateSelector;
    this._handleLikeClick = handleLikeClick;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick.bind(this);
  };

  getId() {
    return this._id;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.places__card')
      .cloneNode(true);

    return cardElement;
  };

  _isUserOwner() {
    return this._ownerId === this._userId;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardName = this._element.querySelector('.places__name');
    this._cardImage = this._element.querySelector('.places__image');
    this._likeIcon = this._element.querySelector('.places__like');
    this._likeNumber = this._element.querySelector('.places__like-number');
    this._deleteIcon = this._element.querySelector('.places__delete');
    this._cardName.textContent = this._text;
    this._cardImage.alt = this._text;
    this._cardImage.src = this._image;

    // если я не автор - убрать удаление
    if (!this._isUserOwner()) {
      this._deleteIcon.classList.add('places__delete_inactive')
    };

    this.setLikesNumber(this._likesArray);

    this._setEventListeners(this._element);
    return this._element;
  };

  _setEventListeners () {
    this._likeIcon.addEventListener('click', () => {this._handleLikeClick(this)});

    this._deleteIcon.addEventListener('click', this._handleDeleteClick);

    this._cardImage.addEventListener('error', () => {this._imageError()});

    this._cardImage.addEventListener('click', this._handleCardClick);
  };

  deleteCard() {
    this._element.remove();
  };

  didILikedIt() {
    return this._likesArray.some((item) => {
      return item._id === this._userId;
    })
  }

  setLikesNumber (likesArray) {
    this._likesArray = likesArray;
    this._likeNumber.textContent = this._likesArray.length;
    this._likeIcon.classList.toggle('places__like_active', this.didILikedIt());
  };

  _imageError() {
    this._cardImage.src = errorImage;
    this._cardImage.classList.add('places__image_error');
    this._cardImage.removeEventListener('click', this._handleCardClick);
  };
};

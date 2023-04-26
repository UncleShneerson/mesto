import {popupGallery, captionGallery, imageGallery} from './variables.js';
import {openPopup, areThereCards} from './utils/utils.js';

export class Card {
  constructor(data, templateSelector) {
    this._text = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
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
    this._likeIcon.addEventListener('click', () => {
      this._likeIt(this._likeIcon);
    });

    this._deleteIcon.addEventListener('click', () => {
      this._deleteCard(this._element);
      areThereCards();
    });

    this._cardImage.addEventListener('error', () => {
      this._replaceImageError(this._cardImage);
    });

    this._cardImage.addEventListener('click', this._openGallery);
  };

  _deleteCard(item) {
    item.remove();
  };

  _likeIt (item) {
    item.classList.toggle('places__like_active');
  };

  _openGallery(evt) {
    imageGallery.src = evt.target.src;
    imageGallery.alt = evt.target.alt;
    captionGallery.textContent = evt.target.alt;

    openPopup(popupGallery);
  };

  _replaceImageError(imageElement) {
    imageElement.src = './images/place_holder.jpeg';
    imageElement.classList.add('places__image_error');
    imageElement.removeEventListener('click', this._openGallery);
  };
};

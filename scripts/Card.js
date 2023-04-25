import {openPopup} from './index.js';

export class Card {
  constructor(data, templateSelector) {
    this._text = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._cardsGrid = document.querySelector('.places__grid');
  };

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.places__card')
      .cloneNode(true);

    return cardElement;
  };

  _generateCard() {
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

  _setEventListeners (item) {
    this._likeIcon.addEventListener('click', () => {
      this._likeIt(this._likeIcon);
    });

    this._deleteIcon.addEventListener('click', () => {
      this._deleteCard(this._element);
      this._areThereCards();
    });

    this._cardImage.addEventListener('error', () => {
      this._replaceImageError(this._cardImage);
    });

    this._cardImage.addEventListener('click', this._openGallery);
  };

  renderCard() {
    const newCard = this._generateCard();
    this._cardsGrid.prepend(newCard);
    this._areThereCards();
  }

  _deleteCard(item) {
    item.remove();
  };

  _likeIt (item) {
    item.classList.toggle('places__like_active');
  };

  _openGallery(evt) {
    const popupGallery = document.querySelector('.popup_funct_image');
    const captionGallery = popupGallery.querySelector('.gallery__caption');
    const imageGallery = popupGallery.querySelector('.gallery__photo');

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

  _areThereCards() {
    const noticeNoCard = document.querySelector('.places__notice');
    if (this._cardsGrid.firstElementChild === null) {
      noticeNoCard.classList.add('places__notice_active');
    } else {
      noticeNoCard.classList.remove('places__notice_active');
    };
  };
}

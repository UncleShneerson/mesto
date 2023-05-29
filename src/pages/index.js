//ИМПОРТЫ WEBPACK
import '../pages/index.css';

// МОДУЛИ
import {btnEditAvatar, btnEdit, btnAdd} from '../utils/constants.js';

import {validationConfig} from '../utils/data.js';

import Api from '../components/Api.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupAppprove from '../components/PopupApprove.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

//API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'd1a94a05-476b-47ad-bf8b-c677840ac343'
  }
});

// НАПОЛНЕНИЕ ДАННЫМИ
//Наполняем страницу сначала данными пользователя затем карточек
api.getUserInfo((res) => {
  thisUser.setUserInfo(res);
  getInitialCards(thisUser.info._id);
});

// ТЕКУЩИЙ ПОЛЬЗОВАТЕЛЬ
const thisUser = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});

// СЕКЦИЯ И КАРТОЧКИ
const cardSection = new Section({
  render: (item) => {renderCard(item)}
}, '.places__grid')

function renderCard (item) {
  cardSection.addItem(createCard(item));
}

function createCard (item) {
  const cardElement = new Card(item, '.template__cards', handleCardClick, handleDeleteClick, handleLikeClick).generateCard();

  isShowDeleteButton (cardElement, item.owner._id);
  isShowLike (item, cardElement);

  return cardElement;
}

function isShowDeleteButton (card, cardOwnerId) {
  if (cardOwnerId !== thisUser.info._id) {
    card.querySelector('.places__delete')
      .classList.add('places__delete_inactive');
  }
}

function isShowLike (card, cardElement) {
  if (didILikeIt(card.likes)) {
    cardElement.querySelector('.places__like')
      .classList.add('places__like_active');
  }
}

function didILikeIt (likesArray) {
  return likesArray.some((item) => {
    return item._id === thisUser.info._id
  })
}

function handleCardClick () {
  popupGallery.open(this);
}

function handleDeleteClick() {
  popupDeleteApprove.open();
  popupDeleteApprove.setData(this);
}

function handleLikeClick (card) {
  if (!didILikeIt(card.data.likes)) {
    setLike(card);
  } else {
    deleteLike(card);
  }
}

function setLike (card) {
  api.addLike (card.id, (res) => {
    card.likeIt();
    card.setLikesNumber(res.likes.length);
  })
}

function deleteLike (card) {
  api.deleteLike (card.id, (res) => {
    card.likeIt();
    card.setLikesNumber(res.likes.length);
  })
}

// Наполнение страницы стартовыми карточками
function getInitialCards () {
  api.getInitialCards((res) => {
    cardSection.renderItems(res);
  });
}

// ПОПАПЫ
// Попап Аватара
const popupAvatar = new PopupWithForm('.popup_funct_avatar', handleSubmitAvatarForm);
popupAvatar.setEventListeners();

// Попап профиля
const popupProfile = new PopupWithForm('.popup_funct_profile', handleSubmitProfileForm);
popupProfile.setEventListeners();

// Попап карточек
const popupCard = new PopupWithForm('.popup_funct_cards', handleSubmitCardForm);
popupCard.setEventListeners();

// Попап удаления карточки
const popupDeleteApprove = new PopupAppprove('.popup_funct_deleteCard', handleSubmitDeleteForm);
popupDeleteApprove.setEventListeners();

// Попап галереи
const popupGallery = new PopupWithImage('.popup_funct_image')
popupGallery.setEventListeners();

//ФОРМЫ
function openProfileForm () {
  formProfileValidator.toggleSubmitBtnState();
  const {name, about} = thisUser.getUserInfo();
  popupProfile.form.userName.value = name;
  popupProfile.form.userDescription.value = about;
  popupProfile.open();
};

function handleSubmitAvatarForm (formData) {
  api.editUserAvatar(formData, (res) => {
    thisUser.setUserInfo(res);
    popupAvatar.close();
  })
}

function handleSubmitProfileForm (formData) {
  const {userName, userDescription} = formData;
  api.editUserInfo(
    {
      name: userName,
      about: userDescription
    },
    (res) => {
      thisUser.setUserInfo(res);
      popupProfile.close();
    }
  );
};

function handleSubmitCardForm (formData) {
  const {cardLink, cardPlace} = formData;
  const newCardData = {
    name: cardPlace,
    link: cardLink
  };

  api.postCard(newCardData, (res) => {
      renderCard(res);
      popupCard.close();
    }
  );
};

function handleSubmitDeleteForm (card) {
  api.deleteCard(card.id, () => {
     card.deleteCard();
     popupDeleteApprove.close();
  });
}

// ВАЛИДАЦИЯ
const formAvatarValidator = new FormValidator(validationConfig, popupAvatar.form);
formAvatarValidator.enableValidation();

const formProfileValidator = new FormValidator(validationConfig, popupProfile.form);
formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationConfig, popupCard.form);
formCardValidator.enableValidation();

const formDeleteValidator = new FormValidator(validationConfig, popupDeleteApprove.form);
formDeleteValidator.enableValidation();

// CЛУШАТЕЛИ
//открываем редактирование аватара
btnEditAvatar.addEventListener('click', () => popupAvatar.open())

//открыть редактирование профиля
btnEdit.addEventListener('click', openProfileForm);

//открыть добавление карты
btnAdd.addEventListener('click', () => {
  formCardValidator.toggleSubmitBtnState();
  popupCard.open()
});

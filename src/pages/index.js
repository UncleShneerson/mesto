// Сергей, как всегда огромное спасибо за все комментарии и дополнительные материалы,
// внимательно прочел обе статьи и надеюсь на этот раз выполнил все верно )

// Отдельное спасибо за расписанный Promise.all с удовольствием улучшил эту часть

// отловил ошибку (что если ставить лайк и сразу снимать - цифры не менялись без обновления страницы,
// правда не знаю правильным ли образом поправил)

// в любом случае всегда рад дополнительным замечаниям

// Хорошего дня и еще раз спасибо )


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

function showErrorApi (err) {
  alert(`
      К сожалению что-то пошло не так.
      ${err}

      Перепроверьте данные
      и повторите попытку
    `);
}

// НАПОЛНЕНИЕ ДАННЫМИ
//Наполняем страницу данными пользователя и карточек одновременно!
Promise.all([
  api.getUserInfo(),
  api.getInitialCards() ])
.then(([info, initialCards])=>{
  thisUser.setUserInfo(info);
  cardSection.renderItems(initialCards);
})
.catch((err)=>{showErrorApi(err)});

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
  const myId = thisUser.getId();
  const card = new Card(item, '.template__cards', myId, handleCardClick, handleDeleteClick, handleLikeClick);
  const cardElement = card.generateCard();

  return cardElement;
}

function handleCardClick () {
  popupGallery.open(this);
}

function handleDeleteClick() {
  popupDeleteApprove.open();
  popupDeleteApprove.setData(this);
}

function handleLikeClick (card) {
  if (!card.didILikedIt()) {
     setLike(card);
  } else {
     deleteLike(card);
  }
}

function setLike (card) {
  api.addLike (card.getId())
  .then((res) => {
    card.setLikesNumber(res.likes);
    card.likeIt();
  })
  .catch(err => showErrorApi(err))
}

function deleteLike (card) {
  api.deleteLike(card.getId())
  .then((res) => {
    card.setLikesNumber(res.likes);
    card.likeIt();
  })
  .catch(err => showErrorApi(err))
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
  api.editUserAvatar(formData)
  .then((res) => {
    thisUser.setUserInfo(res);
    popupAvatar.close();
  })
  .catch(err => showErrorApi(err))
  .finally(() => {popupAvatar.btnReset()})
}

function handleSubmitProfileForm (formData) {
  const {userName, userDescription} = formData;
  api.editUserInfo(
    {
      name: userName,
      about: userDescription
    })
  .then((res) => {
    thisUser.setUserInfo(res);
    popupProfile.close();
  })
  .catch(err => showErrorApi(err))
  .finally(() => {popupProfile.btnReset()})
};

function handleSubmitCardForm (formData) {
  const {cardLink, cardPlace} = formData;
  const newCardData = {
    name: cardPlace,
    link: cardLink
  };

  api.postCard(newCardData)
  .then((res) => {
    renderCard(res);
    popupCard.close();
  })
  .catch(err => showErrorApi(err))
  .finally(() => {popupCard.btnReset()})
};

function handleSubmitDeleteForm (card) {
  api.deleteCard(card.getId())
  .then(() => {
    card.deleteCard();
    popupDeleteApprove.close();
  })
  .catch(err => showErrorApi(err))
  .finally(() => {popupDeleteApprove.btnReset()});
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

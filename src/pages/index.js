//КОММЕНТАРИИ
// Сергей, приветствую! =) В этот раз не повторил прошлую ошибку, и увидев ваше имя сразу понял, что правки будут дельные :)
// спасибо за очередные детальные комментарии и особенно за дополнительную справку
// где-то меня переклинило и подумал, что если константы это "инстанцирование класса" - то они тоже должны начинаться с большой буквы.
// надеюсь, остальные комментарии тоже учел верно. Немного запутался с тем где должны лежать константы и дата - оставил в утилитах.
// Буду ждать фитбека, и в любом случае сердиться больше не буду :) Еще раз спасибо и хорошего дня!

//ИМПОРТЫ WEBPACK
import '../pages/index.css';

// МОДУЛИ
import {btnEdit, btnAdd} from '../utils/constants.js';

import {initialCards, validationConfig} from '../utils/data.js';

import {areThereCards} from '../utils/utils.js';

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

// ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
const thisUser = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});

// СЕКЦИЯ И КАРТОЧКИ
const cardSection = new Section({
  items: initialCards,
  render: (item) => {renderCard(item)}
}, '.places__grid')

function renderCard (item) {
  cardSection.addItem(createCard(item));
}

function createCard (item) {
  const cardElement = new Card(item, '.template__cards', handleCardClick, handleDeleteClick).generateCard();
  return cardElement;
}

function handleCardClick() {
  popupGallery.open(this);
}

function handleDeleteClick() {
  this.deleteCard();
  areThereCards();
};

cardSection.renderItems();

// ПОПАПЫ
// Попап профиля
const popupProfile = new PopupWithForm('.popup_funct_profile', handleSubmitProfileForm);
popupProfile.setEventListeners();

// Попап карточек
const popupCard = new PopupWithForm('.popup_funct_cards', handleSubmitCardForm);
popupCard.setEventListeners();

// Попап галереи
const popupGallery = new PopupWithImage('.popup_funct_image')
popupGallery.setEventListeners();

//ФОРМЫ
function openProfileForm () {
  formProfileValidator.toggleSubmitBtnState();
  const {name, description} = thisUser.getUserInfo();
  popupProfile.form.userName.value = name;
  popupProfile.form.userDescription.value = description;
  popupProfile.open();
};

function handleSubmitProfileForm (formData) {
  const {userName, userDescription} = formData;
  thisUser.setUserInfo({name: userName, description: userDescription});
};

function handleSubmitCardForm (formData) {
  const {cardLink, cardPlace} = formData;
  const newCardData = {
    name: cardPlace,
    link: cardLink
  };
  renderCard(newCardData);
  areThereCards();
};

// ВАЛИДАЦИЯ
// Валидация формы профиля
const formProfileValidator = new FormValidator(validationConfig, popupProfile.form);
formProfileValidator.enableValidation();

// Валидация формы карточек
const formCardValidator = new FormValidator(validationConfig, popupCard.form);
formCardValidator.enableValidation();

// CЛУШАТЕЛИ
//открыть редактирование профиля
btnEdit.addEventListener('click', openProfileForm);

//открыть добавление карты
btnAdd.addEventListener('click', () => {formCardValidator.toggleSubmitBtnState(); popupCard.open()});

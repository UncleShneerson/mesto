//ИМПОРТЫ WEBPACK
import '../pages/index.css';

// МОДУЛИ
import {btnEdit, btnAdd} from './utils/constants.js';

import {initialCards, validationConfig} from './utils/data.js';

import {areThereCards} from './utils/utils.js';

import Section from './components/Section.js';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import UserInfo from './components/UserInfo.js';

// ДАННЫЕ ПОЛЬЗОВАТЕЛЯ
const ThisUser = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});

// СЕКЦИЯ И КАРТОЧКИ
const CardSection = new Section({
  items: initialCards,
  render: (item) => {createGaleryCard(item)}
}, '.places')

function createGaleryCard (item) {
  const CardElement = new Card(item, '.template__cards', handleCardClick).generateCard();
  CardSection.addItem(CardElement, '.places__grid');
}

function handleCardClick() {
  PopupGallery.open(this);
}

CardSection.renderItems();

// ПОПАПЫ
// Попап профиля
const PopupProfile = new PopupWithForm('.popup_funct_profile', handleSubmitProfileForm);
PopupProfile.setEventListeners();

// Попап карточек
const PopupCard = new PopupWithForm('.popup_funct_cards', handleSubmitCardForm);
PopupCard.setEventListeners();

// Попап галереи
const PopupGallery = new PopupWithImage('.popup_funct_image')
PopupGallery.setEventListeners();

//ФОРМЫ
function openProfileForm () {
  formProfileValidator.toggleSubmitBtnState();
  const {name, description} = ThisUser.getUserInfo();
  PopupProfile.form.userName.value = name;
  PopupProfile.form.userDescription.value = description;
  PopupProfile.open();
};

function handleSubmitProfileForm (formData) {
  const {userName, userDescription} = formData;
  ThisUser.setUserInfo({name: userName, description: userDescription});
};

function handleSubmitCardForm (formData) {
  const {cardLink, cardPlace} = formData;
  const newCard = {
    name: cardPlace,
    link: cardLink
  };
  createGaleryCard(newCard);
  areThereCards();
};

// ВАЛИДАЦИЯ
// Валидация формы профиля
const formProfileValidator = new FormValidator(validationConfig, PopupProfile.form);
formProfileValidator.enableValidation();

// Валидация формы карточек
const formCardValidator = new FormValidator(validationConfig, PopupCard.form);
formCardValidator.enableValidation();

// CЛУШАТЕЛИ
//открыть редактирование профиля
btnEdit.addEventListener('click', openProfileForm);

//открыть добавление карты
btnAdd.addEventListener('click', () => {formCardValidator.toggleSubmitBtnState(); PopupCard.open()});

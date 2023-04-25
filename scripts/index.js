// МОДУЛИ
import {initialCards, validationConfig} from './data.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
export {openPopup};



// ПЕРЕМЕННЫЕ
const content = document.querySelector('.content');

const profileName = content.querySelector('.profile__name');
const profileJob = content.querySelector('.profile__description');

const btnEdit = content.querySelector('.button_func_edit');
const btnAdd = content.querySelector('.button_func_add');
const btnCloseList = document.querySelectorAll('.popup__btn-close');

const popupArray = Array.from(document.querySelectorAll('.popup'));
const popupProfile = document.querySelector('.popup_funct_profile');
const formProfile = popupProfile.querySelector('.form');
const inputName = formProfile.querySelector('input[name="profile-name"]');
const inputJob = formProfile.querySelector('input[name="profile-job"]');

const popupCard = document.querySelector('.popup_funct_cards');
const formCard = popupCard.querySelector('.form');
const inputCardPlace = formCard.querySelector('input[name="card-place"]');
const inputCardLink = formCard.querySelector('input[name="card-link"]');



// ФУНКЦИИ
// Наполняем страницу карточками
initialCards.forEach (item => {
  new Card(item, '.template__cards').renderCard();
});

// Включаем валидацию
const formProfileValidator = new FormValidator(validationConfig, formProfile);
formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationConfig, formCard);
formCardValidator.enableValidation();


function openPopup (popupName) {
  document.addEventListener('keydown', handleCloseByKey);
  popupName.classList.add('popup_opened');
};


function closePopup (popupName) {
  document.removeEventListener('keydown', handleCloseByKey);
  popupName.classList.remove('popup_opened');
};


function handleCloseByKey (evt) {
  if (evt.key === 'Escape'){
    const popupOpened = popupArray.find((item) => item.classList.contains('popup_opened'));
    closePopup(popupOpened)
  }
};


function editProfile () {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;

  openPopup (popupProfile);
};


function handleSubmitProfileForm () {
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  closePopup (popupProfile);
};


function handleSubmitCardForm () {
  const newCardValues = {
    name: inputCardPlace.value,
    link: inputCardLink.value
  };

  new Card(newCardValues, '.template__cards').renderCard();

  formCard.reset();

  formCardValidator.toggleSubmitBtnState();
  closePopup (popupCard);
};



// ОТСЛЕЖИВАНИЯ
//Редактировать профиль
btnEdit.addEventListener('click', editProfile);

//Сабмит формы редактирования
formProfile.addEventListener('submit', handleSubmitProfileForm);

//Добавить карту
btnAdd.addEventListener('click', () => {openPopup(popupCard);});

//Сабмит формы добавления
formCard.addEventListener('submit', handleSubmitCardForm);

//Закрытия попапов
btnCloseList.forEach((item) => {item.addEventListener('click', () =>
  {closePopup(item.closest('.popup'));}
)});

popupArray.forEach((item) => item.addEventListener('click', (evt) => {
  if (evt.currentTarget === evt.target) {
    closePopup(item)};
}));

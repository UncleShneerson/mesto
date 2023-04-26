// МОДУЛИ
import {profileName, profileJob, btnEdit, btnAdd, btnCloseList, cardsGrid, popupArray, popupProfile, formProfile, inputName, inputJob, popupCard, formCard, inputCardPlace, inputCardLink} from './variables.js';
import {initialCards, validationConfig} from './data.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {openPopup, closePopup, areThereCards} from './utils/utils.js';

// ФУНКЦИИ
// Наполняем страницу карточками
initialCards.forEach (item => {
  renderCard(item);
});

function renderCard (item) {
  cardsGrid.prepend(createCard(item));
  areThereCards();
};

function createCard (data) {
  const newCard = new Card(data, '.template__cards').generateCard();
  return newCard;
};

// Включаем валидацию
const formProfileValidator = new FormValidator(validationConfig, formProfile);
formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationConfig, formCard);
formCardValidator.enableValidation();

// Работа форм
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

  renderCard(newCardValues);
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

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

const popupGallery = document.querySelector('.popup_funct_image');
const captionGallery = popupGallery.querySelector('.gallery__caption');
const imageGallery = popupGallery.querySelector('.gallery__photo');

const cardsGrid = document.querySelector('.places__grid');
const template = document.querySelector('.template__cards').content;
const templateCard = template.querySelector('.places__card');

const noticeNoCard = document.querySelector('.places__notice');



// ФУНКЦИИ
//Заполняем страницу базовыми карточками
initialCards.forEach(renderCard);

function renderCard (item) {
  cardsGrid.prepend(createCard(item));
};

function isUrlImage (evt) {
  ;
}

function createCard (item) {
  //Подствляем значения и копируем темплате
  const cardElement = templateCard.cloneNode(true);
  const cardName = cardElement.querySelector('.places__name');
  const cardImage = cardElement.querySelector('.places__image');
  const cardLike = cardElement.querySelector('.places__like');
  const cardDelete = cardElement.querySelector('.places__delete');

  cardName.textContent = item.name;
  cardImage.alt = item.name;
  cardImage.src = item.link;

  //Навешиваем события
  cardImage.addEventListener('click', () => {
    createGallery (item);
  });

  cardImage.addEventListener('error', () => {
    cardImage.src = './images/place_holder.jpeg';
  });

  cardLike.addEventListener('click', () => {
    likeIt(cardLike);
  });

  cardDelete.addEventListener('click', () => {
    deleteCard(cardElement);
    areThereCards();
  });

  return cardElement;
};


function likeIt (item) {
  item.classList.toggle('places__like_active');
}


function deleteCard (item) {
  item.remove();
};


function createGallery (item) {
  imageGallery.src = item.link;
  imageGallery.alt = item.name;
  captionGallery.textContent = item.name;

  openPopup(popupGallery);
};


function areThereCards () {
  if (cardsGrid.firstElementChild === null) {
    noticeNoCard.classList.add('places__notice_active');
  } else {
    noticeNoCard.classList.remove('places__notice_active');
  };
};


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
  const submitBtn = formCard.querySelector(config.submitButtonSelector);
  const inputList = Array.from(formCard.querySelectorAll(config.inputSelector));
  // Получаем данные и передаем в массив, передаем на рендер последний элемент
  const newCardValues = {
    name: inputCardPlace.value,
    link: inputCardLink.value
  };
  renderCard(newCardValues);
  formCard.reset();

  toggleSubmitBtnState(inputList, submitBtn);
  areThereCards ();
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

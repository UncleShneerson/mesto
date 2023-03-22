// ПЕРЕМЕННЫЕ
const content = document.querySelector('.content'); //Содержимое
const profileName = content.querySelector('.profile__name'); //Имя
const profileJob = content.querySelector('.profile__description'); //Работа

const btnEdit = content.querySelector('.button_func_edit'); //Кнопка редактировать профиль
const btnAdd = content.querySelector('.button_func_add'); //Кнопка добавления карточки
const btnClose = document.querySelectorAll('.popup__btn-close'); //Кнопки закрытия попапов

const popupProfile = document.querySelector('.popup_funct_profile'); //Попап Профиль
const pForm = popupProfile.querySelector('.form'); //Форма профиля
const nameInput = pForm.querySelector('input[name="pfName"]'); //Поле ввода Имя
const jobInput = pForm.querySelector('input[name="pfJob"]'); //Поле ввода Работа

const popupCards = document.querySelector('.popup_funct_cards'); //Попап Карточки
const cForm = popupCards.querySelector('.form'); //Форма добавления карточки

const popupGallery = document.querySelector('.popup_funct_image'); //Попап галереи

const cardsGrid = document.querySelector('.places__grid'); //Сетка каточек
const templateCards = document.querySelector('.template__cards').content; //Темплейт шаблон
const templateCard = templateCards.querySelector('.places__card'); //Карточка места
const cardName = templateCards.querySelector('.places__name'); // Имя карточки
const cardImage = templateCards.querySelector('.places__image'); // Картинка карточки

//МАССИВ КАРТОЧЕК
const initialCards = [
  {
    name: 'Австралия',
    link: './images/place_australia.webp'
  },
  {
    name: 'Бристоль',
    link: './images/place_bristol.webp'
  },
  {
    name: 'Карибский Бассейн',
    link: './images/place_carribbean.webp'
  },
  {
    name: 'Мальдивы',
    link: './images/place_maldives.webp'
  },
  {
    name: 'Мароко',
    link: './images/place_morocco.webp'
  },
  {
    name: 'Венеция',
    link: './images/place_venice.webp'
  }
];



// ФУНКЦИИ
//Cтартовые катрочки из массива
initialCards.forEach(createCard);

//Создание новой карточки
function createCard (item) {
  //Подствляем значения и копируем темплейт
  cardName.textContent = item.name;
  cardImage.style.backgroundImage = `url(${item.link})`;
  const cardElement = templateCard.cloneNode(true);

  //Открыть галерею нажав на картинку
  cardElement.querySelector('.places__image').addEventListener('click', (evt) => {
    createGallery (evt.target);
    popupGallery.classList.toggle('popup_opened');
  });

  //Действие лайка в карточке
  cardElement.querySelector('.places__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('places__like_active');
  });

  //Действие корзины в карточке
  cardElement.querySelector('.places__delete').addEventListener('click', (evt) => {
    evt.target.closest('.places__card').remove();
    //По идее карточка должна еще и удаляться из массива, но подумал, что пока этого можно не делать.
    //Как решение вижу => создать коллекцию для id => каждой карточке присваивать id и сохранять его в Set
    // => при удалении карточки как узла - определять id и удалять его из коллекции и из массиваconsole.log();

    areThereCards(); //поверка остались ли карточки
  });

  //Вставляем карточку в конец
  cardsGrid.append(cardElement);
};


//Подставление данных в галерею
function createGallery (item) {
  const description = item.nextElementSibling.nextElementSibling.firstElementChild.textContent;
  const url = item.style.backgroundImage.slice(5, -2);
  const galleryPhoto = popupGallery.querySelector('.gallery__photo');

  galleryPhoto.src = `${url}`;
  galleryPhoto.alt = popupGallery.querySelector('.gallery__caption').textContent = description;
}


//Проверка на наличие карточек - отсебятина
function areThereCards () {
  const notice = document.querySelector('.places__notice');
if (cardsGrid.firstElementChild === null) {
  notice.classList.toggle('places__notice_active')} else {
    notice.classList.remove('places__notice_active');
  };
};


//Открытие и закрытие попапа
function popupVisibleChange (popupName) {
  popupName.classList.toggle('popup_opened');
}


//Редактирование профиля
function profileEdit () {
  nameInput.value = profileName.textContent; //Присваиваем значения полям ввода
  jobInput.value = profileJob.textContent;

  popupVisibleChange (popupProfile); //Открываем попап
}


//Сабмит формы редактирования
function handleFormSubmit (evt) {
  evt.preventDefault(); //Отменяем стандартную отправку, УДАЛИТЬ в будущем
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popupVisibleChange (popupProfile); //Закрываем попап
}


//Сабмит формы добавления
function handleCardFormSubmit (evt) {
  evt.preventDefault(); //Отменяем стандартную отправку, УДАЛИТЬ в будущем

  // Создаем объект из полученных значений
  const cardName = cForm.querySelector('input[name="сfName"]').value; //Вынес в константу для удобства
  const newCardValues = {
     name: cardName[0].toUpperCase() + cardName.slice(1), //подставляем и капитализируем первую букву
     link: cForm.querySelector('input[name="сfLink"]').value
  };

  // Добавляем объект в массив
  initialCards.push(newCardValues);

  //Создаем карту из последего добавленношл в массив объекта
  createCard(initialCards[initialCards.length - 1]);
  areThereCards ();
  popupVisibleChange (popupCards); //Закрываем попап

}



// ОТСЛЕЖИВАНИЯ
btnEdit.addEventListener('click', profileEdit); //Редактировать профиль
pForm.addEventListener('submit', handleFormSubmit); //Сабмит формы редактирования

btnAdd.addEventListener('click', () => {popupVisibleChange(popupCards);});
cForm.addEventListener('submit', handleCardFormSubmit); //Сабмит формы добавления

btnClose.forEach((item) => {item.addEventListener('click', (evt) => //Закрытия попапов
  {popupVisibleChange (evt.target.parentElement.parentElement);});
});

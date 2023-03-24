// Сергей, простите, не могу не сказать. Получил комменты, прочитал, не понял практически 2\3 - жутко надулся на весь день от мысли "НУ ВСЕ ЖЕ РАБОТАЕТ!!!!"
// уже в конце подумал ну надо же что-то делать. Сел, разобрал последовательно. вник. Сижу смеюсь. Не могу не поблагодарить за все комментарии
// от всех .next.next.child.nex избавился ) потому что изначально чушь передал в галлерею.
// имена привел в соответствие и понял что от 90% комментариев можно избавиться, т.к. они дублируют имена.
// В общем надеюсь ничего не пропустил, но жду еще комментарии, т.к. практика показывает, что сдаю ревью раз на 3й )
//
// один вопрос. В карточке я делал картинку div'ом, чтобы через padding-bottom 100% заставлять ее всегда быть квадратной при адаптиве, теперь есть 3 варианта
// 1) для img я нашел выход в aspect-ratio: 1 но он работает только с середины 21-го года.
// 2) так же понимаю, что в теории можно по средствам js брать ширину картинки при загрузки страницы и передавать это же значение высотой. (но стоит ли грузить этим систему?)
// 3) отойти от квадрата и задать высоту всегда 250px
// я выбрал в.1 в надежде, что все обновились, но может надо решить иначе?




// ПЕРЕМЕННЫЕ
const content = document.querySelector('.content');

const profileName = content.querySelector('.profile__name');
const profileJob = content.querySelector('.profile__description');

const btnEdit = content.querySelector('.button_func_edit');
const btnAdd = content.querySelector('.button_func_add');
const btnClose = document.querySelectorAll('.popup__btn-close');

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
}

function createCard (item) {
  //Подствляем значения и копируем темплате
  const cardElement = templateCard.cloneNode(true);
  const cardName = cardElement.querySelector('.places__name');
  const cardImage = cardElement.querySelector('.places__image');
  const cardLike = cardElement.querySelector('.places__like');
  const cardDelete = cardElement.querySelector('.places__delete');

  cardName.textContent = item.name;
  cardImage.src = item.link;

  //Навешиваем события
  cardImage.addEventListener('click', () => {
    createGallery (item);
    openPopup(popupGallery);
  });

  cardLike.addEventListener('click', (evt) => {
    likeIt(evt.target);
  });

  cardDelete.addEventListener('click', (evt) => {
    deleteCard(evt.target);
    areThereCards();
  });

  return cardElement;
};


function likeIt (item) {
  item.classList.toggle('places__like_active');
}


function deleteCard (item) {
  item.closest('.places__card').remove()
}


function createGallery (item) {
  imageGallery.src = item.link;
  imageGallery.alt = item.name
  captionGallery.textContent = item.name;
}


function areThereCards () {
  if (cardsGrid.firstElementChild === null) {
    noticeNoCard.classList.add('places__notice_active');
  } else {
    noticeNoCard.classList.remove('places__notice_active');
  };
};


function openPopup (popupName) {
  popupName.classList.add('popup_opened');
}


function closePopup (popupName) {
  popupName.classList.remove('popup_opened');
}


function editProfile () {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;

  openPopup (popupProfile);
}


function handleSubmitProfileForm (evt) {
  evt.preventDefault(); //Отменяем стандартную отправку, УДАЛИТЬ в будущем
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;

  closePopup (popupProfile);
}


//Сабмит формы добавления
function handleSubmitCardForm (evt) {
  evt.preventDefault(); //Отменяем стандартную отправку, УДАЛИТЬ в будущем

  // Получаем данные и передаем в массив, передаем на рендер последний элемент
  const newCardValues = {
    name: inputCardPlace.value,
    link: inputCardLink.value
  };

  initialCards.push(newCardValues);
  renderCard(initialCards[initialCards.length - 1]);

  inputCardPlace.value = '';
  inputCardLink.value = '';

  areThereCards ();
  closePopup (popupCard);
}



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
btnClose.forEach((item) => {item.addEventListener('click', (evt) =>
  {closePopup(evt.target.closest('.popup'));});
});

// ПЕРЕМЕННЫЕ
let content = document.querySelector('.content'); //Содержимое
let btnEdit = content.querySelector('.button_func_edit'); //Кнопка редактировать профиль
let profileName = content.querySelector('.profile__name'); //Имя
let profileJob = content.querySelector('.profile__description'); //Работа
let popup = document.querySelector('.popup'); //Попап
let btnClose = popup.querySelector('.popup__btn-close'); //Кнопка закрыть
let pForm = document.querySelector('.form'); //Форма профиля
let nameInput = pForm.querySelector('input[name="pfName"]'); //Поле ввода Имя
let jobInput = pForm.querySelector('input[name="pfJob"]'); //Поле ввода Работа



// ФУНКЦИИ
//Открытие и закрытие попапа
function popupVisibleChange () {
  popup.classList.toggle('popup_opened');
}

//Редактирование профиля
function profileEdit () {
  nameInput.value = profileName.textContent; //Присваиваем значения полям ввода
  jobInput.value = profileJob.textContent;

  popupVisibleChange (); //Открываем попап
}


//Сохранение профайл формы
function handleFormSubmit (evt) {
  evt.preventDefault(); //Отменяем стандартную отправку, УДАЛИТЬ в будущем
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popupVisibleChange (); //Закрываем попап
}



// ОТСЛЕЖИВАНИЯ
btnEdit.addEventListener('click', profileEdit); //Редактировать профиль
btnClose.addEventListener('click', popupVisibleChange); //Закрыть редактирование профиля
pForm.addEventListener('submit', handleFormSubmit); //Сабмит профайл формы

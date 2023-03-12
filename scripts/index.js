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
//Открытие попапа
function popupVisibleOn () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popup.classList.add('popup_opened');
  console.log(profileJob.textContent + ' ' + nameInput.value);
}


//Закрытие попапа
function popupVisibleOff () {
  popup.classList.remove('popup_opened');
}


//Сохранение профайл формы
function handleFormSubmit (evt) {
  evt.preventDefault(); //Отменяем стандартную отправку, УДАЛИТЬ в будущем
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popupVisibleOff (); //Закрываем попап
}



// ОТСЛЕЖИВАНИЯ
btnEdit.addEventListener('click', popupVisibleOn); //Редактировать профиль
btnClose.addEventListener('click', popupVisibleOff); //Закрыть редактирование профиля
pForm.addEventListener('submit', handleFormSubmit); //Сабмит профайл формы

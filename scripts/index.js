let content = document.querySelector('.content');
let popup = document.querySelector('.popup');

let btnEdit = content.querySelector('.button_func_edit');
let btnClose = popup.querySelector('.popup__btn-close');


function popupVisible () {
  popup.classList.toggle('popup_opened');
}

btnEdit.addEventListener('click', popupVisible);
btnClose.addEventListener('click', popupVisible);


let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__form-input_name');
let jobInput = document.querySelector('.popup__form-input_job');

let profileName = content.querySelector('.profile__name');
let profileJob = content.querySelector('.profile__description');

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

function handleFormSubmit (evt) {
  evt.preventDefault();


  if (nameInput.value.length == 0 || jobInput.value.length == 0) {
    alert('Пожалуйста, заполните оба поля');
  } else {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popupVisible ();
  }
}

formElement.addEventListener('submit', handleFormSubmit);

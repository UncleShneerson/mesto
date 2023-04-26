export {initialCards, validationConfig};

//КАРТОЧКИ МЕСТ
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

//КОНФИГ ВАЛИДАЦИИ
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_type_error',
  submitButtonSelector: '.button_type_submit',
  spanErrorSelector: '.form__input-error_place_',
  spanErrorClassToggle: 'form__input-error_visible',
  inactiveButtonClass: 'button_disabled',
};

// WEBPACK IMPORT
const australiaImage = new URL('../../images/place_australia.webp', import.meta.url);
const bristolImage = new URL('../../images/place_bristol.webp', import.meta.url);
const carribbeanImage = new URL('../../images/place_carribbean.webp', import.meta.url);
const maldivesImage = new URL('../../images/place_maldives.webp', import.meta.url);
const moroccoImage = new URL('../../images/place_morocco.webp', import.meta.url);
const veniceImage = new URL('../../images/place_venice.webp', import.meta.url);

//КАРТОЧКИ МЕСТ
export const initialCards = [
  {
    name: 'Австралия',
    link: australiaImage
  },
  {
    name: 'Бристоль',
    link: bristolImage
  },
  {
    name: 'Карибский Бассейн',
    link: carribbeanImage
  },
  {
    name: 'Мальдивы',
    link: maldivesImage
  },
  {
    name: 'Мароко',
    link: moroccoImage
  },
  {
    name: 'Венеция',
    link: veniceImage
  }
];

//КОНФИГ ВАЛИДАЦИИ
export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_type_error',
  submitButtonSelector: '.button_type_submit',
  spanErrorSelector: '.form__input-error_place_',
  spanErrorClassToggle: 'form__input-error_visible',
  inactiveButtonClass: 'button_disabled',
};

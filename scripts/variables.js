// ПЕРЕМЕННЫЕ
export const content = document.querySelector('.content');

export const profileName = content.querySelector('.profile__name');
export const profileJob = content.querySelector('.profile__description');

export const btnEdit = content.querySelector('.button_func_edit');
export const btnAdd = content.querySelector('.button_func_add');
export const btnCloseList = document.querySelectorAll('.popup__btn-close');

export const cardsGrid = document.querySelector('.places__grid');
export const noticeNoCard = document.querySelector('.places__notice');

export const popupArray = Array.from(document.querySelectorAll('.popup'));
export const popupProfile = document.querySelector('.popup_funct_profile');
export const formProfile = popupProfile.querySelector('.form');
export const inputName = formProfile.querySelector('input[name="profile-name"]');
export const inputJob = formProfile.querySelector('input[name="profile-job"]');

export const popupCard = document.querySelector('.popup_funct_cards');
export const formCard = popupCard.querySelector('.form');
export const inputCardPlace = formCard.querySelector('input[name="card-place"]');
export const inputCardLink = formCard.querySelector('input[name="card-link"]');

export const popupGallery = document.querySelector('.popup_funct_image');
export const captionGallery = popupGallery.querySelector('.gallery__caption');
export const imageGallery = popupGallery.querySelector('.gallery__photo');

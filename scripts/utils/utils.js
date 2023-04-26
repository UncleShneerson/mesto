export {openPopup, closePopup, areThereCards};
import {popupArray, cardsGrid, noticeNoCard} from '../variables.js';

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

function areThereCards() {
  if (cardsGrid.firstElementChild === null) {
    noticeNoCard.classList.add('places__notice_active');
  } else {
    noticeNoCard.classList.remove('places__notice_active');
  };
};

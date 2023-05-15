export {areThereCards};
import {noticeNoCard} from './constants.js';

function areThereCards() {
  if (document.querySelector('.places__grid').firstElementChild === null) {
    noticeNoCard.classList.add('places__notice_active');
  } else {
    noticeNoCard.classList.remove('places__notice_active');
  };
};

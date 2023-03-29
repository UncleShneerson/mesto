const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_type_error',
  submitButtonSelector: '.button_type_submit',

  spanErrorSelector: '.form__input-error_place_',
  spanErrorClassToggle: 'form__input-error_visible',

  inactiveButtonClass: 'button_disabled',
};


// 1. Включить валидацию с полученным конфигом //отключаем стандартную отправку
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setInputEventListeners(formElement);
  });
};


// 2. Устанавливам слушатели на инпуты
function setInputEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleSubmitBtnState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      checkInputValidity(formElement, inputElement);
      toggleSubmitBtnState(inputList, buttonElement);
    })
  });
};


// 3. проверяем инпуты на валидность // показываем или убираем сообщение
function checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};


// 4.1 Показываем ошибку
function showInputError (formElement, inputElement, validationMessage) {
  const errorSpanElement = formElement.querySelector(`${config.spanErrorSelector}${inputElement.name}`);

  errorSpanElement.textContent = validationMessage;
  errorSpanElement.classList.add(config.spanErrorClassToggle);
  inputElement.classList.add(config.inputErrorClass);
};


// 4.2 Отчищаем ошибки
function hideInputError (formElement, inputElement) {
  const errorSpanElement = formElement.querySelector(`${config.spanErrorSelector}${inputElement.name}`);

  errorSpanElement.classList.remove(config.spanErrorClassToggle);
  errorSpanElement.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
};


//5.1 Переключаем активность кнопки если поля валидны
function toggleSubmitBtnState (inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};


// 5.2 Проверяем поля на валидность
function hasInvalidInput (inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};


// ВКЛЮЧИТЬ ВАЛИДАЦИЮ
enableValidation(config);

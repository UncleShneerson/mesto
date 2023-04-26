export class FormValidator {
  constructor(config, form) {
    this._form = form;
    this._inputSelector = config.inputSelector;
    this._inputErrorClass = config.inputErrorClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._spanErrorSelector = config.spanErrorSelector;
    this._spanErrorClassToggle = config.spanErrorClassToggle;
    this._inactiveButtonClass = config.inactiveButtonClass;
  }

  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setInputEventListeners();
  };

  _setInputEventListeners() {
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);

    this.toggleSubmitBtnState(this._inputList, this._buttonElement);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {
        this._checkInputValidity(inputElement);
        this.toggleSubmitBtnState();
      })
    });
  }

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _showInputError (inputElement, validationMessage) {
    const errorSpanElement = this._form.querySelector(`${this._spanErrorSelector}${inputElement.name}`);
   errorSpanElement.textContent = validationMessage;
    errorSpanElement.classList.add(this._spanErrorClassToggle);
    inputElement.classList.add(this._inputErrorClass);
  };

  _hideInputError (inputElement) {
    const errorSpanElement = this._form.querySelector(`${this._spanErrorSelector}${inputElement.name}`);
   errorSpanElement.classList.remove(this._spanErrorClassToggle);
    errorSpanElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  };

  // Второй публичный метод необходим, т.к. к нему обращаемся при сабмите формы.
  toggleSubmitBtnState () {
    if(this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  };

  _hasInvalidInput () {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  };
}

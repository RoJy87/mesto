export class FormValidator {
  constructor(data, validationForm) {
    this._inputSelector = data.inputSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._validationForm = validationForm;
  }

  // Функция включает валидацию форм
  enableValidation() {
    this._formElement = this._validationForm;
    this._buttonElement = document.querySelector(`.${this._formElement.id}-btn`);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._setEventListeners();
    this._toggleButtonState();
  };

  // Функция навешивает слушатели на инпуты
  _setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._formElement.addEventListener('input', () => {
      this._toggleButtonState();
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
      });
    });
  };

   // Функция получения поля ошибки
   _getErrorelement(inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
  }

  // Функция валидации инпутов
  _checkInputValidity(inputElement) {
    this._getErrorelement(inputElement);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // Функция отображения ошибки
  _showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  };

  // Функция убирает отображение ошибки
  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  };

  // Функция активации кнопки формы и сброса ошибок
  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._getErrorelement(inputElement);
      this._hideInputError(inputElement);
    });
  }

  // Функция изменения состояния кнопки submit
  _toggleButtonState() {
    const isFormValid = this._formElement.checkValidity();
    this._buttonElement.disabled = !isFormValid;
    this._buttonElement.classList.toggle(this._inactiveButtonClass, !isFormValid);
  }
}


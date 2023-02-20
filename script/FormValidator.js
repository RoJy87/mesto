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
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._setEventListeners();
    this._toggleButtonState();
  };

  // Функция навешивает слушатели на инпуты
  _setEventListeners() {
    this._formElement.addEventListener('submit',  (evt) => {
      evt.preventDefault();
    });
    this._formElement.addEventListener('input',  () => {
      this._toggleButtonState();
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input',  () => {
        this._checkInputValidity(inputElement);
      });
    });
  };

  // Функция валидации инпутов
  _checkInputValidity(inputElement) {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  };

  // Функция отображения ошибки
  _showInputError(inputElement, errorElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  // Функция убирает отображение ошибки
  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  // Функция изменения состояния кнопки submit
  _toggleButtonState() {
    const buttonElement = document.querySelector(`.${this._formElement.id}-btn`);
    const isFormValid = this._formElement.checkValidity();
    buttonElement.disabled = !isFormValid;
    buttonElement.classList.toggle(this._inactiveButtonClass, !isFormValid);
  }
}


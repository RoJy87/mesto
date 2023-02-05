const validationConfig = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const inputList = Array.from(document.querySelectorAll(validationConfig.inputSelector));

// Функция включает валидацию форм
function enableValidation(configList) {
  const formElements = document.querySelectorAll(configList.formSelector);
  formElements.forEach((formElement) => {
    setEventListeners(formElement, configList);
    toggleButtonState(formElement, configList);
  })
};

// Функция навешивает слушатели на инпуты
function setEventListeners(formElement, configList) {
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
  formElement.addEventListener('input', function () {
    toggleButtonState(formElement, configList);
  });
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement, configList);
    });
  });
};

// Функция валидации инпутов
function checkInputValidity(inputElement, configList) {
  const errorElement = document.querySelector(`.${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, inputElement.validationMessage, configList);
  } else {
    hideInputError(inputElement, errorElement, configList);
  }
};

function cleanInputError() {
  inputList.forEach(inputElement => {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    hideInputError(inputElement, errorElement, validationConfig);
  });
}

// Функция отображения ошибки
function showInputError(inputElement, errorElement, errorMessage, configList) {
  inputElement.classList.add(configList.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configList.errorClass);
};

// Функция убирает отображение ошибки
function hideInputError(inputElement, errorElement, configList) {
  inputElement.classList.remove(configList.inputErrorClass);
  errorElement.classList.remove(configList.errorClass);
  errorElement.textContent = '';
};

// Функция изменения состояния кнопки submit
function toggleButtonState(formElement, configList) {
  const buttonElement = document.querySelector(`.${formElement.id}-btn`);
  const isFormValid = formElement.checkValidity();
  buttonElement.disabled = !isFormValid;
  buttonElement.classList.toggle(configList.inactiveButtonClass, !isFormValid);
}

enableValidation(validationConfig);





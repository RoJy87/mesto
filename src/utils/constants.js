export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const page = document.querySelector('.page');

// Профиль
export const editButton = page.querySelector('.profile__edit-btn');
export const addButton = page.querySelector('.profile__add-btn');

// Popup профиль
export const formProfile = page.querySelector('.popup__form-data');
export const nameInput = document.querySelector('.popup__input_value_name');
export const jobInput = document.querySelector('.popup__input_value_status');

// Popup место
export const formPlace = page.querySelector('.popup__form-place');

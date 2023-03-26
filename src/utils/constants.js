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
export const avatarButton = page.querySelector('.profile__avatar-btn');

// Popup профиль
export const formProfile = page.querySelector('.popup__form-data');
export const nameInput = document.querySelector('.popup__input_value_name');
export const jobInput = document.querySelector('.popup__input_value_status');

// Popup место
export const formPlace = page.querySelector('.popup__form-place');

// Popup аватар
export const formAvatar = page.querySelector('.popup__form-avatar');

// Popup spinner
export const spinnerPopup = page.querySelector('.popup_type_spinner');

export const urlRequest = {
  baseUrl: 'https://nomoreparties.co/v1/cohort-62/',
  mestoUrl: 'https://mesto.nomoreparties.co/v1/cohort-62/',
  userUrl: 'https://mesto.nomoreparties.co/v1/cohort-62/users/me',
  cardsUrl: 'https://mesto.nomoreparties.co/v1/cohort-62/cards',
  changeAvatarUrl: 'https://mesto.nomoreparties.co/v1/cohort-62/users/me/avatar',
}

export const token = 'a6b845cf-1ca5-4112-9ba1-70a351e023c9';


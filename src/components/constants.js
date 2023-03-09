export const validationConfig = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const page = document.querySelector('.page');

// Профайл

const profile = page.querySelector('.profile');
export const editButton = profile.querySelector('.profile__edit-btn');
export const addButton = profile.querySelector('.profile__add-btn');
export const userData = {
  name: profile.querySelector('.profile__name'),
  description: profile.querySelector('.profile__description'),
}

// Popup Редактировать профиль
export const popupProfileSelector = page.querySelector('.popup_type_edit-profile');
export const formProfile = popupProfileSelector.querySelector('.popup__form-data');

// Popup Добавить новое место
export const popupPlaceSelector = page.querySelector('.popup_type_add-place');
export const formPlace = popupPlaceSelector.querySelector('.popup__form-place');
export const placeInputList = {
  name: popupPlaceSelector.querySelector('.popup__input_value_place-name'),
  link: popupPlaceSelector.querySelector('.popup__input_value_url'),
}

// Popup картинки
export const popupImageSelector = page.querySelector('.popup_type_image');

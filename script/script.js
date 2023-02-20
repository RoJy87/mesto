import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./initialCards.js";

const validationConfig = {
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__save-btn_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const page = document.querySelector('.page');
const ESC_BUTTON = 27;

// Профайл

const profile = page.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-btn');
const addButton = profile.querySelector('.profile__add-btn');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

// Popup Редактировать профиль
const popupEditProfile = page.querySelector('.popup_type_edit-profile');
const formProfile = popupEditProfile.querySelector('.popup__form-data');
const nameInput = popupEditProfile.querySelector('.popup__input_value_name');
const jobInput = popupEditProfile.querySelector('.popup__input_value_status');

// Popup Добавить новое место
const popupAddPlace = page.querySelector('.popup_type_add-place');
const formPlace = popupAddPlace.querySelector('.popup__form-place');
const placeNameInput = popupAddPlace.querySelector('.popup__input_value_place-name');
const placeUrlInput = popupAddPlace.querySelector('.popup__input_value_url');

// Блок places
const places = page.querySelector('.places');

// Создаем объекты класса Валидации
const profileValid = new FormValidator(validationConfig, formProfile);
const addPlaceValid = new FormValidator(validationConfig, formPlace);

// Запускаем валидацию
profileValid.enableValidation();
addPlaceValid.enableValidation();

// Открываем Popup
export function openModalWindow(modalWindow) {
  modalWindow.classList.add('popup_opened');
  page.addEventListener('keydown', closePopupByEsc);
  modalWindow.addEventListener('mousedown', closePopup);
}

// Закрываем Popup
function closeModalWindow(modalWindow) {
  modalWindow.classList.remove('popup_opened');
  page.removeEventListener('keydown', closePopupByEsc);
  modalWindow.removeEventListener('mousedown', closePopup);
}

// Сброс формы
function formReset(modalWindow) {
  const formElement = modalWindow.querySelector(validationConfig.formSelector);
  formElement.reset();
}

// Очищаем ошибки инпутов после закрытия формы
function cleanInputError(formElement) {
  const inputList = formElement.querySelectorAll(validationConfig.inputSelector);
  inputList.forEach(inputElement => {
    const errorElement = document.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = '';
  });
}

// Открываем форму редактирования профайла
function openEditProfilePopup() {
  formReset(popupEditProfile);
  profileValid._toggleButtonState();
  changeFormAttributeValue();
  changeProfileValue();
  cleanInputError(formProfile);
  openModalWindow(popupEditProfile);
}

// Открываем форму добавления новой карточки
function openAddPlacePopup() {
  setButtonDisabled(popupAddPlace);
  formReset(popupAddPlace);
  cleanInputError(formPlace);
  openModalWindow(popupAddPlace);
}

// Октлючаем кнопку сохранения при открытии
function setButtonDisabled(modalWindow) {
  const buttonElement = modalWindow.querySelector(`.popup__save-btn`);
  buttonElement.disabled = true;
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

// Меняем значения атрибутов в форме Профайл
function changeFormAttributeValue() {
  nameInput.setAttribute('value', profileName.textContent);
  jobInput.setAttribute('value', profileDescription.textContent);
}

// Редактируем данные в Профайле
function changeProfileValue() {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  changeFormAttributeValue();
}

// Создаем объект карточки и вставляем на страницу
function renderCard(element, container) {
  const card = new Card(element, '.places__template');
  const cardElement = card.createCard();
  container.prepend(cardElement);
  formReset(popupAddPlace);
}

// Вставляем карточки из массива
initialCards.forEach((card) => {
  renderCard(card, places);
});

// Закрываем любую форму
function closePopup(evt) {
  const targets = evt.target.classList;
  if (targets.contains('popup__close-btn')
    || targets.contains('popup')) {
    closeModalWindow(evt.currentTarget);
  }
}

// Закрываем форму по кнопке ESC
function closePopupByEsc(evt) {
  if (evt.keyCode === ESC_BUTTON) {
    const popupActive = page.querySelector('.popup_opened');
    closeModalWindow(popupActive)
  }
}

// функция изменения данных профайла
function formEditProfile() {
  changeProfileValue();
  closeModalWindow(popupEditProfile);
}

// функция добавления новой карточки
function formAddNewPlace() {
  const card = {
    name: placeNameInput.value,
    link: placeUrlInput.value,
  }
  renderCard(card, places);
  closeModalWindow(popupAddPlace);
}

// Навешиваем события
editButton.addEventListener('click', openEditProfilePopup);
addButton.addEventListener('click', openAddPlacePopup);
formProfile.addEventListener('submit', formEditProfile);
formPlace.addEventListener('submit', formAddNewPlace);



import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../components/initialCards.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  validationConfig,
  editButton,
  addButton,
  userData,
  popupProfileSelector,
  formProfile,
  popupPlaceSelector,
  formPlace,
  placeInputList,
  popupImageSelector,
} from "../components/constants.js"


// объекты класса Валидации
const profileValidator = new FormValidator(validationConfig, formProfile);
const addPlaceValidator = new FormValidator(validationConfig, formPlace);

// Запускаем валидацию
profileValidator.enableValidation();
addPlaceValidator.enableValidation();

// объекты класса Данные пользователя
const defaultUser = new UserInfo(userData);

// объекты класса блока для вставки карточек
const cardSection = new Section(
  {
    data: initialCards,
    renderer: (element) => {
      const cardElement = createCard(element);
      cardSection.addItem(cardElement);
    }
  }, '.places');
cardSection.renderElements();

// объекты класса Popup
const popupImage = new PopupWithImage(popupImageSelector);

const popupPlace = new PopupWithForm(
  {
    popupSelector: popupPlaceSelector,
    formSubmit: () => {
      const item = {
        name: placeInputList.name.value,
        link: placeInputList.link.value,
      }
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
      popupPlace.close();
    }
  }
);

const popupProfile = new PopupWithForm
  (
    {
      popupSelector: popupProfileSelector,
      formSubmit: () => {
        defaultUser.setUserInfo();
        popupProfile.close();
      }
    }
  );

// Открываем форму редактирования профайла
function handleEditProfileClick() {
  profileValidator.resetValidation();
  defaultUser.getUserInfo();
  defaultUser.setUserInfo();
  popupProfile.open();
  popupProfile.setEventListeners();
}

// Открываем форму добавления новой карточки
function handleAddPlaceClick() {
  addPlaceValidator.resetValidation();
  popupPlace.open();
  popupPlace.setEventListeners();
}

// Открываем попап с картинкой
function handleCardClick(name, link) {
  popupImage.open(name, link);
  popupImage.setEventListeners();
}

// Создаем объект карточки
function createCard(element) {
  const card = new Card(element, '.places__template', handleCardClick);
  const cardElement = card.createCardElement();
  return cardElement;
}

// Навешиваем события
editButton.addEventListener('click', handleEditProfileClick);
addButton.addEventListener('click', handleAddPlaceClick);



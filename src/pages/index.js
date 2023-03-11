import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../utils/initialCards.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  validationConfig,
  editButton,
  addButton,
  formProfile,
  nameInput,
  jobInput,
  formPlace,
} from "../utils/constants.js"


// объекты класса Валидации
const profileValidator = new FormValidator(validationConfig, formProfile);
const addPlaceValidator = new FormValidator(validationConfig, formPlace);

// Запускаем валидацию
profileValidator.enableValidation();
addPlaceValidator.enableValidation();

// объекты класса Данные пользователя
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description'
});

// объекты класса блока для вставки карточек
const cardSection = new Section(
  {
    data: initialCards,
    renderer: (element) => {
      cardSection.addItem(createCard(element));
    }
  }, '.places');
cardSection.renderElements();

// объекты класса Popup
const popupImage = new PopupWithImage('.popup_type_image');

const popupPlace = new PopupWithForm(
  {
    popupSelector: '.popup_type_add-place',
    submitHandler: (element) => {
      cardSection.addItem(createCard(element));
      popupPlace.close();
    }
  }
);

const popupProfile = new PopupWithForm
  (
    {
      popupSelector: '.popup_type_edit-profile',
      submitHandler: (element) => {
        userInfo.setUserInfo(element);
        popupProfile.close();
      }
    }
  );

// Открываем форму редактирования профайла
function handleEditProfileClick() {
  profileValidator.resetValidation();
  const infoObject = userInfo.getUserInfo();
  nameInput.value = infoObject.name;
  jobInput.value = infoObject.description;
  popupProfile.open();
}

// Открываем форму добавления новой карточки
function handleAddPlaceClick() {
  addPlaceValidator.resetValidation();
  popupPlace.open();
}

// Открываем попап с картинкой
function handleCardClick(name, link) {
  popupImage.open(name, link);
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



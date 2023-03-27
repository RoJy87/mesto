import './index.css';
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithSubmit } from "../components/PopupWithSubmit";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from '../components/Api';
import {
  spinnerPopup,
  validationConfig,
  editButton,
  addButton,
  avatarButton,
  formProfile,
  formPlace,
  formAvatar,
  urlRequest,
  token,
} from "../utils/constants.js"


// объекты класса Валидации
const profileValidator = new FormValidator(validationConfig, formProfile);
const addPlaceValidator = new FormValidator(validationConfig, formPlace);
const avatarValidator = new FormValidator(validationConfig, formAvatar);

// Создаем класс api
const api = new Api({
  url: urlRequest,
  headers: {
    authorization: token,
    'Content-Type': 'application/json',
  }
});

function spinner(isWait) {
  if (isWait) {
    spinnerPopup.classList.add('popup_opened-spinner');
  } else {
    spinnerPopup.classList.remove('popup_opened-spinner');
  }
}

spinner(true);

Promise.all([api.pullUserInfo(), api.getItems()])
  .then(([res1, res2]) => {

    // объекты класса Данные пользователя
    const userInfo = new UserInfo({
      nameSelector: '.profile__name',
      descriptionSelector: '.profile__description',
      avatarSelector: '.profile__avatar',
    });

    // объекты класса блока для вставки карточек
    const cardSection = new Section(
      {
        renderer: (element) => { cardSection.addItem(createCard(element)) },
        containerSelector: '.places',
      }
    );

    userInfo.setUserInfo(res1);
    userInfo.setUserAvatar(res1)
    cardSection.renderElements(res2);

    // Создаем объект карточки
    function createCard(element) {
      const card = new Card({
        data: element,
        handleCardClick: (name, link) => { popupImage.open(name, link) },
        handleLikeClick: () => {
          api.getItems()
            .then((res) => { return card.findCard(res) })
            .then((cardEl) => {
              const isLiked = card.isLikedChecker(cardEl);
              if (isLiked) {
                return api.removeLike(card.getId())
              } else {
                return api.addLike(card.getId())
              }
            })
            .then(() => {
              api.getItems()
                .then((res) => { card.likeRender(card.findCard(res)) })
            })
            .catch((err) => console.log(err));
        },
        handleDeleteCardClick: (element) => { popupConfirm.open(element) },
        templateSelector: '.places__template',
        myId: userInfo.id,
      });
      const cardElement = card.createCardElement();
      return cardElement;
    }

    // объекты класса Popup
    const popupImage = new PopupWithImage('.popup_type_image');

    const popupPlace = new PopupWithForm(
      {
        popupSelector: '.popup_type_add-place',
        submitHandler: (element) => {
          popupPlace.renderLoading(true);
          api.pushCard(element)
            .then((res) => { cardSection.addItem(createCard(res)) })
            .then(() => { popupPlace.close() })
            .catch((err) => { console.log(err) })
            .finally(() => { popupPlace.renderLoading(false) })

        }
      }
    );

    const popupProfile = new PopupWithForm
      (
        {
          popupSelector: '.popup_type_edit-profile',
          submitHandler: (element) => {
            popupProfile.renderLoading(true);
            api.pushUserInfo(element)
              .then((res) => { userInfo.setUserInfo(res) })
              .then(() => { popupProfile.close() })
              .catch((err) => { console.log(err) })
              .finally(() => { popupProfile.renderLoading(false) })
          }
        }
      );

    const popupAvatar = new PopupWithForm
      (
        {
          popupSelector: '.popup_type_edit-avatar',
          submitHandler: (element) => {
            popupAvatar.__proto__ = popupProfile;
            popupAvatar.renderLoading(true);
            api.changeAvatar(element)
              .then((res) => { userInfo.setUserAvatar(res) })
              .then(() => { popupAvatar.close() })
              .catch((err) => { console.log(err) })
              .finally(() => { popupAvatar.renderLoading(false) })
          }
        }
      );

    const popupConfirm = new PopupWithSubmit
      (
        {
          popupSelector: '.popup_type_delete-place',
          submitHandler: (element) => {
            api.deleteCard(element.id)
              .then(() => { element.remove() })
              .then(() => { popupConfirm.close() })
              .catch(err => console.log(err))
          },
        }
      );

    // Запускаем валидацию
    profileValidator.enableValidation();
    addPlaceValidator.enableValidation();
    avatarValidator.enableValidation();

    return [userInfo, popupPlace, popupProfile, popupAvatar]
  })
  .then(([userInfo, popupPlace, popupProfile, popupAvatar]) => {

    // Открываем форму редактирования профайла
    function handleEditProfileClick() {
      profileValidator.resetValidation();
      const infoObject = userInfo.getUserInfo();
      popupProfile.setInputValues(infoObject);
      popupProfile.open();
    }

    // Открываем форму редактирования аватара
    function handleEditAvatarClick() {
      avatarValidator.resetValidation();
      popupAvatar.open();
    }

    // Открываем форму добавления новой карточки
    function handleAddPlaceClick() {
      addPlaceValidator.resetValidation();
      popupPlace.open();
    }

    // Навешиваем события
    editButton.addEventListener('click', handleEditProfileClick);
    addButton.addEventListener('click', handleAddPlaceClick);
    avatarButton.addEventListener('click', handleEditAvatarClick);
  })
  .catch(error => { console.error(error) })
  .finally(() => { spinner(false) })





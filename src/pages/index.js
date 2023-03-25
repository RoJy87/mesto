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
  validationConfig,
  editButton,
  addButton,
  avatarButton,
  formProfile,
  formPlace,
  formAvatar,
  nameInput,
  jobInput,
  urlRequest,
  token,
} from "../utils/constants.js"


// объекты класса Валидации
const profileValidator = new FormValidator(validationConfig, formProfile);
const addPlaceValidator = new FormValidator(validationConfig, formPlace);
const avatarValidator = new FormValidator(validationConfig, formAvatar);

// Запускаем валидацию
profileValidator.enableValidation();
addPlaceValidator.enableValidation();
avatarValidator.enableValidation();

// Создаем класс api
const api = new Api({
  url: urlRequest,
  headers: {
    authorization: token,
    'Content-Type': 'application/json',
  }
});

// объекты класса Данные пользователя
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar',
});

// объекты класса блока для вставки карточек
const cardSection = new Section(
  {
    renderer: (element) => {
      cardSection.addItem(element);
    }
    ,
    containerSelector: '.places',
    cardCreater: createCard,
  }
);

Promise.all([
  api.pullUserInfo()
    .then((res) => {
      userInfo.getUserInfo(res);
      userInfo.getUserAvatar(res)
      console.log(userInfo.id);
    })
    .catch((err) => {
      console.log(err)
    }),
  api.getItems()
    .then((res) => {
      cardSection.renderElements(res);
    })
])
  .catch(error => {
    console.error(error)
  })

// объекты класса Popup
const popupImage = new PopupWithImage('.popup_type_image');

const popupPlace = new PopupWithForm(
  {
    popupSelector: '.popup_type_add-place',
    submitHandler: (element) => {
      popupPlace.renderLoading(true);
      api.pushCard(element)
        .then((res) => {
          cardSection.addItem(res);
        })
        .then(() => popupPlace.close())
        .catch((err) => {
          console.log(err)
        })
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
          .then((res) => {
            userInfo.getUserInfo(res);
            popupProfile.close();
          })
          .catch((err) => {
            console.log(err)
          })
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
          .then((res) => {
            userInfo.getUserAvatar(res);
            popupAvatar.close();
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => { popupAvatar.renderLoading(false) })
      }
    }
  );



// Открываем форму редактирования профайла
function handleEditProfileClick() {
  profileValidator.resetValidation();
  api.pullUserInfo()
    .then((res) => {
      nameInput.value = res.name;
      jobInput.value = res.about;
    })
    .catch((err) => {
      console.log(err)
    });

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

// Создаем объект карточки
function createCard(element) {
  const card = new Card({
    data: element,
    handleCardClick: (name, link) => {
      popupImage.open(name, link);
    },
    handleLikeClick: () => {
      api.checkLike()
        .then((res) => {
          const cardEl = res.find(item => item._id === card._cardId);
          card.likeRender(cardEl);
          return card.isLikedChecker(cardEl);
        })
        .then((isLiked) => {
          if (isLiked == true) {
            api.removeLike(card._cardId)
          } else {
            api.addLike(card._cardId)
          }
        })
        .catch((err) => console.log(err));
    },
    handleDeleteCardClick: (element) => {
      const popupConfirm = new PopupWithSubmit
        (
          {
            popupSelector: '.popup_type_delete-place',
            submitHandler: (evt) => {
              evt.preventDefault();
              api.deleteCard(element.id)
                .catch(err => console.log(err))
              element.remove();
              popupConfirm.close();
            },
          }
        );
      popupConfirm.open();
    },
    templateSelector: '.places__template',
    myId: userInfo.id,
  });
  const cardElement = card.createCardElement();
  return cardElement;
}

// Навешиваем события
editButton.addEventListener('click', handleEditProfileClick);
addButton.addEventListener('click', handleAddPlaceClick);
avatarButton.addEventListener('click', handleEditAvatarClick);




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

// Блок places, Popup Увеличить картинку
const places = page.querySelector('.places');
const popupImage = page.querySelector('.popup_type_image');
const popupPhoto = page.querySelector('.popup__photo');
const caption = page.querySelector('.popup__caption');

// Открываем Popup
function openModalWindow(modalWindow) {
  modalWindow.classList.add('popup_opened');
  page.addEventListener('keydown', closePopupByEsc);
  modalWindow.addEventListener('click', closePopup);
  inputList.forEach(inputElement => {
    checkInputValidity(inputElement, validationConfig);
  });
}
// Закрываем Popup
function closeModalWindow(modalWindow) {
  const formElement = modalWindow.querySelector(validationConfig.formSelector);
  modalWindow.classList.remove('popup_opened');
  page.removeEventListener('keydown', closePopupByEsc);
  modalWindow.removeEventListener('click', closePopup);
  formElement.reset();
}

// Открываем форму редактирования профайла
function openEditProfilePopup() {
  openModalWindow(popupEditProfile);
  changeFormAttributeValue();
  changeProfileValue();
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

// Открываем форму добавления новой карточки
function openAddPlacePopup() {
  openModalWindow(popupAddPlace);
}

// Создаем карточку
function createCard(name, link) {
  const placeTemplate = document.querySelector('.places__template').content;
  const placeElement = placeTemplate.querySelector('.places__items').cloneNode(true);
  const likeButton = placeElement.querySelector('.place__like-btn');
  const deleteButton = placeElement.querySelector('.place__delete-btn');
  const imageButton = placeElement.querySelector('.place__img-btn');

  placeElement.querySelector('.place__photo').src = link;
  placeElement.querySelector('.place__photo').alt = name;
  placeElement.querySelector('.place__name').textContent = name;

  // Добавляем активный клас кнопке лайк
  function addLike() {
    likeButton.classList.toggle('place__like-btn_active');
  }

  // Удаляем карточку
  function removeCard() {
    deleteButton.parentElement.remove()
  };

  // Открываем popup с фото
  function openImage(evt) {
    openModalWindow(popupImage);
    caption.textContent = evt.target.getAttribute('alt');
    popupPhoto.setAttribute('alt', evt.target.getAttribute('alt'));
    popupPhoto.setAttribute('src', evt.target.getAttribute('src'));
  }

  // Навешиваем события
  likeButton.addEventListener('click', addLike);
  deleteButton.addEventListener('click', removeCard);
  imageButton.addEventListener('click', openImage);

  return placeElement;
}

// Вставляем карточку на страницу
function renderCard(element, container) {
  const card = createCard(element.name, element.link);
  container.prepend(card);
  formPlace.reset();
}

// Вставляем карточки из массива
initialCards.forEach(card => {
  renderCard(card, places);
});

// Закрываем любую форму
function closePopup(evt) {
  const targets = evt.target.classList;
  if (targets.contains('popup__close-btn')
    || targets.contains('popup')) {
    closeModalWindow(evt.target.closest('.popup'));
  }
}

function closePopupByEsc(evt) {
  const popupActive = page.querySelector('.popup_opened');
  if (evt.keyCode === ESC_BUTTON) {
    closeModalWindow(popupActive)
  }
}

// Вызываем функцию изменения данных профайла
function formEditProfile(evt) {
  changeProfileValue();
  closeModalWindow(evt.target.closest('.popup'));
}

// Вызываем функцию добавления новой карточки
function formAddNewPlace(evt) {
  const card = {
    name: placeNameInput.value,
    link: placeUrlInput.value,
  }
  renderCard(card, places);
  closeModalWindow(evt.target.closest('.popup'));
}

// Навешиваем события
editButton.addEventListener('click', openEditProfilePopup);
addButton.addEventListener('click', openAddPlacePopup);
formProfile.addEventListener('submit', formEditProfile);
formPlace.addEventListener('submit', formAddNewPlace);


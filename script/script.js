const page = document.querySelector('.page');

// Профайл

const profile = page.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-btn');
const addButton = profile.querySelector('.profile__add-btn');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');

// Popups
const popups = page.querySelectorAll('.popup');

// Popup Редактировать профиль
const popupEditProfile = page.querySelector('.popup_type_edit-profile');
const formProfile = popupEditProfile.querySelector('.popup__form-data');
const nameInput = popupEditProfile.querySelector('.popup__form-field_value_name');
const jobInput = popupEditProfile.querySelector('.popup__form-field_value_status');

// Popup Добавить новое место
const popupAddPlace = page.querySelector('.popup_type_add-place');
const formPlace = popupAddPlace.querySelector('.popup__form-place');
const placeNameInput = popupAddPlace.querySelector('.popup__form-field_value_place-name');
const placeUrlInput = popupAddPlace.querySelector('.popup__form-field_value_url');

// Блок places, Popup Увеличить картинку
const places = page.querySelector('.places');
const popupImage = page.querySelector('.popup_type_image');
const popupPhoto = page.querySelector('.popup__photo');
const caption = page.querySelector('.popup__caption');

// Открытаем форму редактирования профайла
function openEditProfilePopup() {
  popupEditProfile.classList.add('popup_opened');
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
  popupAddPlace.classList.add('popup_opened');
}

// Очищаем поля введенных данных после сохранения
function clearNewPlaceValue() {
  placeNameInput.value = '';
  placeUrlInput.value = '';
}

// Вставляем новую карточку
function insertNewCard(placeName, placeUrl) {
  const placeTemplate = document.querySelector('.places__template').content;
  const placeElement = placeTemplate.querySelector('.places__items').cloneNode(true);

  placeElement.querySelector('.place__photo').src = placeUrl;
  placeElement.querySelector('.place__photo').alt = placeName;
  placeElement.querySelector('.place__name').textContent = placeName;

  places.prepend(placeElement);

  clearNewPlaceValue();
}

// Вставляем карточки из массива
for (let cards in initialCards) {
  placeNameInput.value = initialCards[cards].name;
  placeUrlInput.value = initialCards[cards].link;
  insertNewCard(placeNameInput.value, placeUrlInput.value);
}

// Открываем popup с фото
function openImage(e) {
  if (e.target.classList.contains('place__photo')) {
    popupImage.classList.add('popup_opened');
    caption.textContent = e.target.getAttribute('alt');
    popupPhoto.setAttribute('alt', e.target.getAttribute('alt'));
    popupPhoto.setAttribute('src', e.target.getAttribute('src'));
  }
}

// Добавляем активный клас кнопке лайк
function addLike(e) {
  if (e.target.classList.contains('place__like-btn')) {
    e.target.classList.toggle('place__like-btn_active');
  }
}

function removeCard(e) {
  if (e.target.classList.contains('place__delete-btn')) {
    e.target.parentElement.remove()
  };
}

// Закрываем любую форму
function closePopup(e) {
  if (e.target.classList.contains('popup__close-btn')
    || e.target.classList.contains('popup')
    || e.target.classList.contains('popup__save-btn')) {
    e.target.closest('.popup').classList.remove('popup_opened')
  };
  if (e.keyCode === 27) {
    popups.forEach(n => { n.classList.remove('popup_opened') })
  };
}


// Вызываем функцию изменения данных профайла
function formSubmitHandler(evt) {
  evt.preventDefault();
  changeProfileValue();
  closePopup();
}

// Вызываем функцию добавления новой карточки
function formAddNewPlace(evt) {
  evt.preventDefault();
  insertNewCard(placeNameInput.value, placeUrlInput.value)
  closePopup();
}

// Навешиваем события
editButton.addEventListener('click', openEditProfilePopup);
addButton.addEventListener('click', openAddPlacePopup);
page.addEventListener('click', closePopup);
page.addEventListener('keydown', closePopup);
formProfile.addEventListener('submit', formSubmitHandler);
formPlace.addEventListener('submit', formAddNewPlace);
places.addEventListener('click', addLike);
places.addEventListener('click', removeCard);
places.addEventListener('click', openImage);


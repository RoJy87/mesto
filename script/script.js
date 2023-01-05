let page = document.querySelector('.page');

// Профайл

let profile = page.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-btn');
let addButton = profile.querySelector('.profile__add-btn');
let profileName = profile.querySelector('.profile__name');
let profileDescription = profile.querySelector('.profile__description');

// Popups
let popups = page.querySelectorAll('.popup');
let closeButtons = page.querySelectorAll('.popup__close-btn');

// Popup Редактировать профиль
let popupEditProfile = page.querySelector('.popup_type_edit-profile');
let formProfile = popupEditProfile.querySelector('.popup__form-data');
let nameInput = popupEditProfile.querySelector('.popup__form-field_value_name');
let jobInput = popupEditProfile.querySelector('.popup__form-field_value_status');


// Popup Добавить новое место
let popupAddPlace = page.querySelector('.popup_type_add-place');
let formPlace = popupAddPlace.querySelector('.popup__form-place');
let placeNameInput = popupAddPlace.querySelector('.popup__form-field_value_place-name');
let placeUrlInput = popupAddPlace.querySelector('.popup__form-field_value_url');

// Блок places - лайки, и Popup Увеличить картинку
let places = page.querySelector('.places');
let likeButton = places.querySelector('.place__like-btn');
let deleteButton = places.querySelector('.place__delete-btn');
let imageButton = places.querySelector('.place__img-btn');
let cardPhoto = places.querySelector('.place__photo');

let popupImage = page.querySelector('.popup_type_image');
let popupPhoto = page.querySelector('.popup__photo');
let caption = page.querySelector('.popup__caption');

// Открытаем форму редактирования профайла
function editProfile() {
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
function addPlace() {
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
  /* let element = this.parentElement;
  element.remove(); */
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
editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', addPlace);
page.addEventListener('click', closePopup);
page.addEventListener('keydown', closePopup);
formProfile.addEventListener('submit', formSubmitHandler);
formPlace.addEventListener('submit', formAddNewPlace);
places.addEventListener('click', addLike);
places.addEventListener('click', removeCard);
places.addEventListener('click', openImage);


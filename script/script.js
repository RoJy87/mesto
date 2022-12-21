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
let formElement = popupEditProfile.querySelector('.popup__form-data');
let nameValue = popupEditProfile.querySelector('.popup__form-field_value_name');
let jobValue = popupEditProfile.querySelector('.popup__form-field_value_status');


// Popup Добавить новое место
let popupAddPlace = page.querySelector('.popup_type_add-place');
let formPlace = popupAddPlace.querySelector('.popup__form-place');
let placeNameValue = popupAddPlace.querySelector('.popup__form-field_value_place-name');
let urlValue = popupAddPlace.querySelector('.popup__form-field_value_url');

// Popup Увеличить картинку
let popupImage = page.querySelector('.popup_type_image');
let imageButton = page.querySelector('.place__img-btn');
let cardPhoto = page.querySelector('.place__photo');
let popupPhoto = page.querySelector('.popup__photo');
let caption = page.querySelector('.popup__caption');

// Блок places - лайки
let places = page.querySelector('.places');
let likeButton = places.querySelector('.place__like-btn');
let deleteButton = document.querySelectorAll('.place__delete-btn');


// Открытаем форму редактирования профайла
function editProfile() {
  popupEditProfile.classList.add('popup_opened');
  changeFormAttributeValue();
  changeProfileValue();
}
// Меняем значения атрибутов в форме Профайл
function changeFormAttributeValue() {
  nameValue.setAttribute('value', profileName.textContent);
  jobValue.setAttribute('value', profileDescription.textContent);
}

// Редактируем данные в Профайле
function changeProfileValue() {
  profileName.textContent = nameValue.value;
  profileDescription.textContent = jobValue.value;
  changeFormAttributeValue();
}

// Открываем форму добавления новой карточки
function addPlace() {
  popupAddPlace.classList.add('popup_opened');
}

// Очищаем поля введенных данных после сохранения
function clearNewPlaceValue() {
  placeNameValue.value = '';
  urlValue.value = '';
}

// Вставляем новую карточку
function insertNewCard() {
  places.insertAdjacentHTML('afterbegin', `
  <li class="places__items">
    <article class="place">
      <button type="button" class="place__img-btn button">
        <img src="${urlValue.value}" alt="${placeNameValue.value}" class="place__photo">
      </button>
      <div class="place__wrapper-name">
        <h2 class="place__name">${placeNameValue.value}</h2>
        <button aria-label="Отметить мне нравиться" type="button" class="place__like-btn button"></button>
      </div>
    </article>
    <button aria-label="Удалить карточку" type="button" class="place__delete-btn button"></button>
  </li>
        `);
  clearNewPlaceValue();
}

for (let cards in initialCards) {
  urlValue.value = initialCards[cards].link;
  placeNameValue.value = initialCards[cards].name;
  insertNewCard();
}

// Открываем popup с фото
function openImage(e) {
  console.dir(e.target);
  if (e.target.classList.contains('place__photo')) {
    popupImage.classList.add('popup_opened');
  }
  caption.textContent = e.target.getAttribute('alt');
  popupPhoto.setAttribute('alt', e.target.getAttribute('alt'));
  popupPhoto.setAttribute('src', e.target.getAttribute('src'));
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
  if (e.target.classList.contains('popup__close-btn')) {
    e.target.closest('.popup').classList.remove('popup_opened') };
  if (e.target.classList.contains('popup')) {
    e.target.closest('.popup').classList.remove('popup_opened') };
  if (e.keyCode == 27) {
    popups.forEach(n => {n.classList.remove('popup_opened')}) };
  }

  function savePopupData() {
    popups.forEach(n => {n.classList.remove('popup_opened')});
    }


// Вызываем функцию изменения данных профайла
function formSubmitHandler(evt) {
  evt.preventDefault();
  changeProfileValue();
  savePopupData();
}

// Вызываем функцию добавления новой карточки
function formAddNewPlace(evt) {
  evt.preventDefault();
  insertNewCard()
  savePopupData();
}

// Навешиваем события
editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', addPlace);
page.addEventListener('click', closePopup);
page.addEventListener('keydown', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
formPlace.addEventListener('submit', formAddNewPlace);
places.addEventListener('click', addLike);
places.addEventListener('click', removeCard);
places.addEventListener('click', openImage);


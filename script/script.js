

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

// Редактировать профиль
let popupEditProfile = page.querySelector('.popup_type_edit-profile');
let formElement = popupEditProfile.querySelector('.popup__form-data');
let nameValue = popupEditProfile.querySelector('.popup__form-field_value_name');
let jobValue = popupEditProfile.querySelector('.popup__form-field_value_status');


// Добавить новое место
let popupAddPlace = page.querySelector('.popup_type_add-place');
let formPlace = popupAddPlace.querySelector('.popup__form-place');
let placeNameValue = popupAddPlace.querySelector('.popup__form-field_value_place-name');
let urlValue = popupAddPlace.querySelector('.popup__form-field_value_url');

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

//Вставляем новую карточку
function insertNewCard() {
  places.insertAdjacentHTML('afterbegin', `
  <li class="places__items">
  <article class="place">
    <img src="${urlValue.value}" alt="" class="place__photo">
    <div class="place__wrapper-name">
      <h2 class="place__name">${placeNameValue.value}</h2>
      <button aria-label="Отметить мне нравиться" type="button" class="place__like-btn button"></button>
    </div>
  </article>
</li>
        `);
  clearNewPlaceValue();
}

// Добавляем активный клас кнопке лайк
function addLike(e) {
  if (e.target.classList.contains('place__like-btn')) {
    e.target.classList.toggle('place__like-btn_active');
  }
}

function removeCard(e) {
  if (e.target.classList.contains('place__delete-btn')) {
  e.target.parentElement.remove()};
  /* let element = this.parentElement;
  element.remove(); */
}


// Закрываем любую форму
// TO DO
function closePopup(e) {
  if (e.target.classList.contains('popup__close-btn') || e.target.classList.contains('popup__save-btn')) {
    popups.forEach(n => { n.classList.remove('popup_opened') });
  }
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
  insertNewCard()
  closePopup();
}

// Навешиваем события
editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', addPlace);
page.addEventListener('click', closePopup);
places.addEventListener('click', addLike);
formElement.addEventListener('submit', formSubmitHandler);
formPlace.addEventListener('submit', formAddNewPlace);
places.addEventListener('click', removeCard);


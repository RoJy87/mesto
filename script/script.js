let page = document.querySelector('.page');
let editButton = page.querySelector('.profile__edit-btn');
let addButton = page.querySelector('.profile__add-btn');
let popup = page.querySelectorAll('.popup');
let popupContainer = page.querySelector('.popup__container');
let popupEditProfile = page.querySelector('.popup_type_edit-profile');
let popupAddPlace = page.querySelector('.popup_type_add-place');
let closeButton = page.querySelectorAll('.popup__close-btn');
let formElement = page.querySelector('.popup__form-data');
let nameInput = page.querySelector('.popup__form-field_value_name');
let jobInput = page.querySelector('.popup__form-field_value_status');
let profileName = page.querySelector('.profile__name');
let profileDescription = page.querySelector('.profile__description');


function editProfile() {
  popupEditProfile.classList.add('popup_opened');
  changeFormAttributeValue();
  changeProfileValue();
}

function addPlace() {
  popupAddPlace.classList.add('popup_opened');
}

function closePopup() {
  popup.forEach(e => {e.classList.remove('popup_opened')});
}

function changeFormAttributeValue() {
  nameInput.setAttribute('value', profileName.textContent);
  jobInput.setAttribute('value', profileDescription.textContent);
}

function changeProfileValue() {
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  changeFormAttributeValue();
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  changeProfileValue();
  closePopup();
}

editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', addPlace);
closeButton.forEach(e => {e.addEventListener('click', closePopup)});
formElement.addEventListener('submit', formSubmitHandler);

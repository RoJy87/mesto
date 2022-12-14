let page = document.querySelector('.page');
let editButton = page.querySelector('.profile__edit-btn');
let popup = page.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-btn');
let formElement = popup.querySelector('.popup__form-data');
let nameInput = popup.querySelector('.popup__form-field_value_name');
let jobInput = popup.querySelector('.popup__form-field_value_status');
let profileName = page.querySelector('.profile__name');
let profileDescription = page.querySelector('.profile__description');


function openPopup() {
  popup.classList.add('popup_opened');
  changeFormAttributeValue();
  changeProfileValue();
}

function closePopup() {
  popup.classList.remove('popup_opened');
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

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

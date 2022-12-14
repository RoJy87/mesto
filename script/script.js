let page = document.querySelector('.page');
let editButton = page.querySelector('.profile__edit-btn');
let popup = page.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close-btn');
let formElement = popup.querySelector('.popup__form-data');
let nameInput = popup.querySelector('.popup__form-field_value_name');
let jobInput = popup.querySelector('.popup__form-field_value_status');
let newHeader = page.querySelector('.profile__name');
let newDescription = page.querySelector('.profile__description');


function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.setAttribute('value', newHeader.textContent);
  jobInput.setAttribute('value', newDescription.textContent);
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  newHeader.textContent = nameInput.value;
  newDescription.textContent = jobInput.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

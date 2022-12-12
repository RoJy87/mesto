const editButton = document.querySelector('.profile__edit-btn');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-btn');


function openPopup() {
    editButton.addEventListener('click', function () {
        popup.classList.add('popup_opened');
    });
}

function closePopup() {
    closeButton.addEventListener('click', function () {
        popup.classList.remove('popup_opened');
    });
}

openPopup();
closePopup();

// Находим форму в DOM
let formElement = document.querySelector('.popup__form-data'); // Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = document.querySelector('.popup__form-name').value; // Воспользуйтесь инструментом .querySelector()
    let jobInput = document.querySelector('.popup__form-status').value; // Воспользуйтесь инструментом .querySelector()

    let newHeader = document.querySelector('.profile__name');
    let newDescription = document.querySelector('.profile__description');  // Выберите элементы, куда должны быть вставлены значения полей


    newHeader.textContent = nameInput;
    newDescription.textContent = jobInput;// Вставьте новые значения с помощью textContent

    popup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

const popup = document.querySelector('.popup');
const popupToggleBtn = document.querySelector('.profile__edit-button');
const popupCloseBtn = document.querySelector('.popup__btn-close');
const popupForm = document.querySelector('.popup__form');
const userNameInput = document.querySelector('.popup__input_name');
const userAboutInput = document.querySelector('.popup__input_about');


function openPopup() {
  popup.classList.add('popup__open');
}

function closePopup() {
  popup.classList.remove('popup__open');
}

popupToggleBtn.addEventListener('click', openPopup);

popupCloseBtn.addEventListener('click', closePopup);

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const nameInput = document.querySelector('.popup__input_name');
const aboutInput = document.querySelector('.popup__input_about');

nameInput.value = profileName.textContent;
aboutInput.value = profileAbout.textContent;


function handleFormSubmit (evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;

    closePopup();
}

popupForm.addEventListener('submit', handleFormSubmit);
const popup = document.querySelector('.popup');
const popupToggleBtn = document.querySelector('.profile__edit-button');
const popupCloseBtn = document.querySelector('.popup__btn-close');
const popupForm = document.querySelector('.popup__form');
const userNameInput = document.querySelector('.popup__input_type_name');
const userAboutInput = document.querySelector('.popup__input_type_about');


function openPopup() {
  popup.classList.add('popup__opened');
  userNameInput.value = profileName.textContent;
  userAboutInput.value = profileAbout.textContent;
}

function closePopup() {
  popup.classList.remove('popup__opened');
}

popupToggleBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener('click', closePopup);

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

function handleFormSubmit (evt) {
    evt.preventDefault(); 

    profileName.textContent = userNameInput.value;
    profileAbout.textContent = userAboutInput.value;

    closePopup();
}

popupForm.addEventListener('submit', handleFormSubmit);
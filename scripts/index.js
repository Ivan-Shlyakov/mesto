import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

document.addEventListener('DOMContentLoaded', () => {
  const profilePopup = document.querySelector('.popup-edit');
  const addPopup = document.querySelector('.popup-add');
  const imagePopup = document.querySelector('.popup-image');
  const elementsContainer = document.querySelector('.elements');

  const profileEditButton = document.querySelector('.profile__edit-button');
  const profileAddButton = document.querySelector('.profile__add-button');
  const popupCloseButtons = document.querySelectorAll('.popup__btn-close');
  const popups = document.querySelectorAll('.popup');

  const popupForm = profilePopup.querySelector('.popup__form');
  const userNameInput = profilePopup.querySelector('.popup__input_type_name');
  const userAboutInput = profilePopup.querySelector('.popup__input_type_about');
  const placeInput = addPopup.querySelector('.popup__input_type_place');
  const urlInput = addPopup.querySelector('.popup__input_type_url');

  const profileName = document.querySelector('.profile__name');
  const profileAbout = document.querySelector('.profile__about');

  const popupImageElement = imagePopup.querySelector('.popup__img');
  const popupCaptionElement = imagePopup.querySelector('.popup__img-caption');

  let currentPopup = null;

  function openPopup(popupElement) {
    currentPopup = popupElement;
    popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
  }

  function closePopup(popupElement) {
    if (popupElement === currentPopup) {
      currentPopup = null;
    }

    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
  }

  function closeByEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  }

  function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = userNameInput.value;
    profileAbout.textContent = userAboutInput.value;

    closePopup(profilePopup);
    if (currentPopup !== null) {
      closePopup(currentPopup);
    }
  }

  function createCard(name, link) {
    const card = new Card(name, link, '#card-template');
    const cardElement = card.create();
    return cardElement;
  }

  function deleteCard(card) {
    card.remove();
  }

  function handleAddFormSubmit(evt) {
    evt.preventDefault();
  
    const form = evt.currentTarget; 
    const nameInput = form.querySelector('.popup__input_type_place');
    const linkInput = form.querySelector('.popup__input_type_url');
  
    
    if (nameInput && linkInput && nameInput.value && linkInput.value) {
      const name = nameInput.value;
      const link = linkInput.value;
  
      const newCard = createCard(name, link);
      elementsContainer.insertBefore(newCard, elementsContainer.firstChild);
  
      form.reset(); 
  
      closePopup(addPopup);
      if (currentPopup !== null) {
        closePopup(currentPopup);
      }
  
      profileAddButton.disabled = true;
      formValidatorAdd.resetValidation();
    }
  }
  
  const popupAddForm = addPopup.querySelector('.popup__form'); 
  popupAddForm.addEventListener('submit', handleAddFormSubmit);
  
  

  profileAddButton.addEventListener('click', handleAddFormSubmit);

  profileEditButton.addEventListener('click', () => {
    openPopup(profilePopup);
    userNameInput.value = profileName.textContent;
    userAboutInput.value = profileAbout.textContent;
    formValidatorEdit.resetValidation();
  });

  profileAddButton.addEventListener('click', () => {
    openPopup(addPopup);
  });

  popupCloseButtons.forEach((closeBtn) => {
    closeBtn.addEventListener('click', () => {
      const popup = closeBtn.closest('.popup');
      closePopup(popup);
    });
  });

  popups.forEach((popup) => {
    popup.addEventListener('click', (event) => {
      if (event.target === popup) {
        closePopup(popup);
      }
    });
  });

  popupForm.addEventListener('submit', handleProfileFormSubmit);

  elementsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('element__image')) {
      const cardImage = event.target;
      const imageSrc = cardImage.getAttribute('src');
      const imageAlt = cardImage.getAttribute('alt');

      popupImageElement.setAttribute('src', imageSrc);
      popupImageElement.setAttribute('alt', imageAlt);

      popupCaptionElement.textContent = cardImage.parentElement.querySelector('.element__title').textContent;
      openPopup(imagePopup);
    }
  });

  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
  ];

  initialCards.forEach((cardData) => {
    const card = createCard(cardData.name, cardData.link);
    elementsContainer.appendChild(card);
  });

  const formValidatorSettingsEdit = {
    formSelector: '.popup-edit .popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup-edit .popup__btn-save',
    inputErrorClass: 'popup__input_type_error',
  };

  const formValidatorSettingsAdd = {
    formSelector: '.popup-add .popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup-add .popup__btn-add',
    inputErrorClass: 'popup__input_type_error',
  };

  const formValidatorEdit = new FormValidator(formValidatorSettingsEdit, popupForm);
  formValidatorEdit.enableValidation();

  const formValidatorAdd = new FormValidator(formValidatorSettingsAdd, addPopup.querySelector('.popup__form'));
  formValidatorAdd.enableValidation();
});
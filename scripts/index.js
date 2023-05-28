const popup = document.querySelector('.popup');
const profileEdit = document.querySelector('.profile__edit-button');
const popupCloseBtn = popup.querySelector('.popup__btn-close');
const popupForm = popup.querySelector('.popup__form');
const userNameInput = document.querySelector('.popup__input_type_name');
const userAboutInput = document.querySelector('.popup__input_type_about');
const popupEdit = document.querySelector('.popup-edit');
const profileAdd = document.querySelector('.profile__add-button');
const popupAdd = document.querySelector('.popup-add');
const popupImage = document.querySelector('.popup-image');
const placeInput = document.querySelector('.popup__input_type_place');
const urlInput = document.querySelector('.popup__input_type_url');
const popupImageElement = popupImage.querySelector('.popup__img');
const popupCaptionElement = popupImage.querySelector('.popup__img-caption');
const inputs = document.querySelectorAll('.popup__input');
const saveButton = document.querySelector('.popup__btn-save');
const addButton = document.querySelector('.popup__btn-add');

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

profileEdit.addEventListener('click', () => {
  openPopup(popupEdit);
  userNameInput.value = profileName.textContent;
  userAboutInput.value = profileAbout.textContent;
});

profileAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});


popupCloseBtn.addEventListener('click', () => {
  closePopup(popupEdit);
  closePopup(popupAdd);
  closePopup(popupImage);
});

const popupCloseBtns = document.querySelectorAll('.popup__btn-close');
const popups = document.querySelectorAll('.popup');

popupCloseBtns.forEach((closeBtn) => {
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

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closePopup(popupEdit);
    closePopup(popupAdd);
    closePopup(popupImage);
  }
});

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

function handleFormSubmit (evt) {
    evt.preventDefault(); 

    profileName.textContent = userNameInput.value;
    profileAbout.textContent = userAboutInput.value;

    closePopup(popupEdit);
}

popupForm.addEventListener('submit', handleFormSubmit);

const elementsContainer = document.querySelector('.elements');

function handleCardClick(event) {
  const cardImage = event.target;
  const imageSrc = cardImage.getAttribute('src');
  const imageAlt = cardImage.getAttribute('alt');
  
  popupImageElement.setAttribute('src', imageSrc);
  popupImage.setAttribute('alt', imageAlt);

  popupCaptionElement.textContent = cardImage.parentElement.querySelector('.element__title').textContent;
  openPopup(popupImage);
}

elementsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('element__image')) {
    handleCardClick(event);
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
   }
];

const cardTemplate = document.getElementById('card-template');

function createCard(name, link) {
  const card = cardTemplate.content.cloneNode(true);
  const cardElement = card.querySelector('.element');
  const image = card.querySelector('.element__image');
  const title = card.querySelector('.element__title');
  const likeBtn = card.querySelector('.element__like-btn');
  const deleteBtn = card.querySelector('.element__delete-btn');

  image.src = link;
  image.alt = name;
  title.textContent = name;

  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('element__like-btn_active');
  });

  deleteBtn.addEventListener('click', () => {
    deleteCard(cardElement);
  });
  
  return card;
}

function deleteCard(card) {
  card.remove();
};

const cardsContainer = document.querySelector('.elements');

initialCards.forEach(cardData => {
  const card = createCard(cardData.name, cardData.link);
  cardsContainer.appendChild(card);
});


function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const form = evt.target;

  const name = placeInput.value;
  const link = urlInput.value;

  const newCard = createCard(name, link);
  elementsContainer.insertBefore(newCard, elementsContainer.firstChild);

  form.reset();

  closePopup(popupAdd);
}

const popupAddForm = document.querySelector('.popup-add .popup__form');
popupAddForm.addEventListener('submit', handleAddFormSubmit);


function validateFields() {
  const nameInput = document.querySelector('.popup__input_type_name');
  const aboutInput = document.querySelector('.popup__input_type_about');
  const titleInput = document.querySelector('.popup__input_type_place');
  const urlInput = document.querySelector('.popup__input_type_url');
  const urlError = document.querySelector('#url-error');
  const nameError = document.querySelector('#name-error');
  const aboutError = document.querySelector('#about-error');
  const titleError = document.querySelector('#title-error');

  // Проверка поля "Имя"
  if (nameInput.validity.valueMissing) {
    nameError.textContent = 'Вы пропустили это поле.';
  } else if (nameInput.validity.tooShort || nameInput.validity.tooLong) {
    nameError.textContent = 'Имя должно содержать от 2 до 40 символов';
  } else {
    nameError.textContent = '';
  }

  // Проверка поля "О себе"
  if (aboutInput.validity.valueMissing) {
    aboutError.textContent = 'Вы пропустили это поле.';
  } else if (aboutInput.validity.tooShort || aboutInput.validity.tooLong) {
    aboutError.textContent = 'Описание должно содержать от 2 до 200 символов';
  } else {
    aboutError.textContent = '';
  }

  // Проверка поля "Название"
  if (titleInput.validity.valueMissing) {
    titleError.textContent = titleInput.validationMessage;
  } else if (titleInput.validity.tooShort || titleInput.validity.tooLong) {
    titleError.textContent = titleInput.validationMessage;
  } else {
    titleError.textContent = '';
  }

  // Валидация ссылки на картинку
  if (urlInput.validity.valueMissing) {
    urlError.textContent = urlInput.validationMessage;
  } else if (urlInput.validity.typeMismatch) {
    urlError.textContent = 'Введите корректный URL';
  } else {
    urlError.textContent = '';
  }

  // Активация/деактивация кнопки "Сохранить и Создать"
  saveButton.disabled = !nameInput.validity.valid || !aboutInput.validity.valid;

  addButton.disabled = !titleInput.validity.valid || !urlInput.validity.valid;
}


inputs.forEach(input => {
  input.addEventListener('input', validateFields);
});

popupForm.addEventListener('submit', (e) => {
  e.preventDefault();
});


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

const popupAddCloseBtn = document.querySelector('.popup-add .popup__btn-close');
popupAddCloseBtn.addEventListener('click', () => {
  closePopup(popupAdd);
});

const popupImageCloseBtn = document.querySelector('.popup-image .popup__btn-close');
popupImageCloseBtn.addEventListener('click', () => {
  closePopup(popupImage);
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
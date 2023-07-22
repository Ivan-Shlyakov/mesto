export class Card {
    constructor(name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector);
        const card = cardTemplate.content.cloneNode(true);
        return card;
    }

    _setEventListeners(cardElement) {
        const likeBtn = cardElement.querySelector('.element__like-btn');
        const deleteBtn = cardElement.querySelector('.element__delete-btn');
        const image = cardElement.querySelector('.element__image');

        likeBtn.addEventListener('click', () => {
            likeBtn.classList.toggle('element__like-btn_active');
        });

        deleteBtn.addEventListener('click', () => {
            this._deleteCard(cardElement);
        });

        image.addEventListener('click', () => {
            this._openImagePopup();
        });
    }

    _deleteCard(cardElement) {
        cardElement.remove();
    }

    _openImagePopup() {
        const popupImageElement = document.querySelector('.popup-image .popup__img');
        const popupCaptionElement = document.querySelector('.popup-image .popup__img-caption');
        popupImageElement.setAttribute('src', this._link);
        popupImageElement.setAttribute('alt', this._name);
        popupCaptionElement.textContent = this._name;
        openPopup('.popup-image'); // <-- Added dot to the class name to make it valid
    }

    create() {
        const cardElement = this._getTemplate();
        const image = cardElement.querySelector('.element__image');
        const title = cardElement.querySelector('.element__title');

        image.src = this._link;
        image.alt = this._name;
        title.textContent = this._name;

        this._setEventListeners(cardElement);

        return cardElement;
    }
}

export {
    Card
};
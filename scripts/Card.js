export class Card {
    constructor(name, link) {
        this.name = name;
        this.link = link;
    }

    _getTemplate() {
        const cardTemplate = document.getElementById('card-template');
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
        popupImageElement.setAttribute('src', this.link);
        popupImageElement.setAttribute('alt', this.name);
        popupCaptionElement.textContent = this.name;
        openPopup(popupImage);
    }

    create() {
        const cardElement = this._getTemplate();
        const image = cardElement.querySelector('.element__image');
        const title = cardElement.querySelector('.element__title');

        image.src = this.link;
        image.alt = this.name;
        title.textContent = this.name;

        this._setEventListeners(cardElement);

        return cardElement;
    }
}


export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._settings = settings;
    }

    _showInputError(input, errorMessage) {
        const errorElement = this._form.querySelector(`#${input.id}-error`);
        errorElement.textContent = errorMessage;
        input.classList.add(this._settings.inputErrorClass);
    }

    _hideInputError(input) {
        const errorElement = this._form.querySelector(`#${input.id}-error`);
        errorElement.textContent = '';
        input.classList.remove(this._settings.inputErrorClass);
    }

    _checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideInputError(input);
        } else {
            this._showInputError(input, input.validationMessage);
        }
    }

    _hasInvalidInput(inputs) {
        return inputs.some(input => !input.validity.valid);
    }

    _toggleButtonState(inputs, button) {
        if (this._hasInvalidInput(inputs)) {
            button.classList.add(this._settings.inactiveButtonClass);
            button.setAttribute('disabled', 'disabled');
        } else {
            button.classList.remove(this._settings.inactiveButtonClass);
            button.removeAttribute('disabled');
        }
    }

    _setEventListeners() {
        const inputs = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        const submitButton = this._form.querySelector(this._settings.submitButtonSelector);

        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._toggleButtonState(inputs, submitButton);
            });
        });

        this._toggleButtonState(inputs, submitButton);
    }

    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners();
    }
}
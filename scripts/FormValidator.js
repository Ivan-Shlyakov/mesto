export class FormValidator {
  constructor(settings, formElement) {
      this._formElement = formElement;
      this._inputSelector = settings.inputSelector;
      this._submitButtonSelector = settings.submitButtonSelector;
      this._inactiveButtonClass = settings.inactiveButtonClass;
      this._inputErrorClass = settings.inputErrorClass;
      this._errorClass = settings.errorClass;
  }

  _showInputError(input, errorMessage) {
      const errorElement = this._formElement.querySelector(`#${input.id}-error`);
      errorElement.textContent = errorMessage;
      input.classList.add(this._inputErrorClass);
  }

  _hideInputError(input) {
      const errorElement = this._formElement.querySelector(`#${input.id}-error`);
      errorElement.textContent = '';
      input.classList.remove(this._inputErrorClass);
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
          button.classList.add(this._inactiveButtonClass);
          button.setAttribute('disabled', 'disabled');
      } else {
          button.classList.remove(this._inactiveButtonClass);
          button.removeAttribute('disabled');
      }
  }

  _setEventListeners() {
      const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      const submitButton = this._formElement.querySelector(this._submitButtonSelector);

      inputs.forEach(input => {
          input.addEventListener('input', () => {
              this._checkInputValidity(input);
              this._toggleButtonState(inputs, submitButton);
          });

          input.addEventListener('focus', () => {
              this._hideInputError(input);
          });
      });

      this._toggleButtonState(inputs, submitButton);
  }

  enableValidation() {
      this._formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
      });

      this._setEventListeners();
  }
}

export {
  FormValidator
};
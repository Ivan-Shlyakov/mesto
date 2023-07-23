export class FormValidator {
    constructor(settings, formElement) {
      this._formElement = formElement;
      this._inputSelector = settings.inputSelector;
      this._submitButtonSelector = settings.submitButtonSelector;
      this._inputErrorClass = settings.inputErrorClass;
      this._errorClass = settings.errorClass;
  
      this._submitButton = formElement.querySelector(this._submitButtonSelector);
    }
  
    _showInputError(input, errorMessage) {
      const errorElement = this._formElement.querySelector(`#${input.id}-error`);
      if (errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
        input.classList.add(this._inputErrorClass);
      }
    }
  
    _hideInputError(input) {
      const errorElement = this._formElement.querySelector(`#${input.id}-error`);
      if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
        input.classList.remove(this._inputErrorClass);
      }
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
  
    _toggleButtonState(inputs) {
      const hasInvalidInputs = this._hasInvalidInput(inputs);
      this._submitButton.disabled = hasInvalidInputs;
    }
  
    _setEventListeners() {
      const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  
      inputs.forEach(input => {
        input.addEventListener('input', () => {
          this._checkInputValidity(input);
          this._toggleButtonState(inputs);
        });
  
        input.addEventListener('focus', () => {
          this._hideInputError(input);
        });
      });
  
      this._toggleButtonState(inputs);
    }
  
    enableValidation() {
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
  
      
      if (this._submitButton) {
        this._submitButton.disabled = true; 
      }
    }

    resetValidation() {
        const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        inputs.forEach(input => {
            this._hideInputError(input);
        });

        this._toggleButtonState(inputs);
    }
  }
  
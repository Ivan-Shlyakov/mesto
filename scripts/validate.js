function enableValidation(settings) {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  
  forms.forEach(form => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  
    setEventListeners(form, settings);
  });
}

function setEventListeners(form, settings) {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const submitButton = form.querySelector(settings.submitButtonSelector);
  
  inputs.forEach(input => {
    input.addEventListener('input', function () {
      checkInputValidity(form, input, settings);
      toggleButtonState(inputs, submitButton, settings.inactiveButtonClass);
    });
  });
  
  toggleButtonState(inputs, submitButton, settings.inactiveButtonClass);
}

function checkInputValidity(form, input, settings) {
  const errorElement = form.querySelector(`#${input.id}-error`);

  if (errorElement) {
    if (input.validity.valid) {
      errorElement.textContent = '';
      input.classList.remove(settings.inputErrorClass);
    } else {
      errorElement.textContent = input.validationMessage;
      input.classList.add(settings.inputErrorClass);
    }
  }
}

function toggleButtonState(inputs, button, inactiveButtonClass) {
  const isValid = inputs.every(input => input.validity.valid);

  if (button) {
    if (isValid) {
      button.classList.remove(inactiveButtonClass);
      button.removeAttribute('disabled');
    } else {
      button.classList.add(inactiveButtonClass);
      button.setAttribute('disabled', 'disabled');
    }
  }
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});


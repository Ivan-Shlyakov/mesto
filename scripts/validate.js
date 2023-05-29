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
import intlTelInput from 'intl-tel-input';

import { validation, checkForErrors } from './validation_functions';

intlTelInput(document.querySelector('#phoneNumber'), {
  preferredCountries: ['me', 'ca'],
});

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', goNextStep);
});

function goNextStep(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const container = event.target.closest('div[data-step]');
  const containerNumber = container.dataset.step;

  const errors = validation[`checkStep${containerNumber}`](formData);

  if (checkForErrors(errors)) {
    displayErrors(errors);
    return;
  }
  clearValidationErrors();
  changeRegistrationStep(containerNumber, 'forward');
}

document
  .querySelectorAll('[data-btn="back"]')
  .forEach((button) => button.addEventListener('click', goPreviousStep));

function goPreviousStep(event) {
  event.preventDefault();
  const container = event.target.closest('div[data-step]');
  const containerNumber = container.dataset.step;

  changeRegistrationStep(containerNumber, 'back');
}

function changeRegistrationStep(currentStep, direction) {
  document
    .querySelector(`div[data-step="${currentStep}"`)
    .classList.add('d-none');

  let nextStep;

  if (direction == 'forward') {
    nextStep = +currentStep + 1;
  }
  if (direction == 'back') {
    nextStep = +currentStep - 1;
  }

  document
    .querySelector(`div[data-step="${nextStep}"`)
    .classList.remove('d-none');
}

function displayErrors(errorsObj) {
  for (const error in errorsObj) {
    const errorMessage = errorsObj[error];

    document.querySelector(`#${error}`).classList.add('is-invalid');
    document.querySelector(`div[data-invalid-feedback="${error}"`).innerHTML =
      errorMessage;
  }
}

function clearValidationErrors() {
  document
    .querySelectorAll('.is-invalid')
    .forEach((input) => input.classList.remove('is-invalid'));

  document
    .querySelectorAll('.invalid-feedback')
    .forEach((container) => (container.innerHTML = ''));
}

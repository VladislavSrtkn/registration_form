import intlTelInput from 'intl-tel-input';

import { validation, checkForErrors } from './validation_functions';

intlTelInput(document.querySelector('input[name="phoneNumber"]'), {
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

  clearValidationErrors();

  if (checkForErrors(errors)) {
    displayErrors(errors);
    return;
  }
  changeRegistrationStep(containerNumber, 'forward');
}

document
  .querySelectorAll('button[data-btn="back"]')
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

    document.querySelector(`[name="${error}"]`).classList.add('is-invalid');

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

document
  .querySelectorAll('select')
  .forEach((elem) => elem.addEventListener('change', showNextSelect));

function showNextSelect(event) {
  const currentSelectNumber = +event.target.dataset.chainOfSelects;
  const nextSelectNumber = currentSelectNumber + 1;

  const dependentSelect = document.querySelector(
    `select[data-chain-of-selects="${nextSelectNumber}"]`
  );

  if (!dependentSelect) {
    return;
  }

  const pickedValue = event.target.value;
  const valuesArray = getValuesForSelect(pickedValue);

  displayDependentSelect(valuesArray, nextSelectNumber);
}

function displayDependentSelect(valuesArray, number) {
  const selectElem = document.querySelector(
    `select[data-chain-of-selects="${number}"]`
  );
  const selectElemHeader = document.querySelector(
    `[data-chain-of-selects-head="${number}"]`
  );

  selectElemHeader.classList.remove('d-none');

  selectElem.classList.remove('d-none');
  selectElem.innerHTML = '';

  for (const value of valuesArray) {
    const selectOption = document.createElement('option');
    selectOption.innerHTML = value;
    selectOption.value = value;

    selectElem.append(selectOption);
  }
}

function getValuesForSelect(value) {
  const selectValues = {
    '...': [],
    Sport: ['Football', 'Hockey', 'Basketball', 'Golf', 'Ski'],
    Games: ['Dota', 'Counter-strike', 'World of Warcraft', 'PUBG'],
    Cinema: ['Comedy', 'Drama', 'Horror', 'Thriller'],
  };

  const valuesArray = ['...'];

  valuesArray.push(...selectValues[value]);

  return valuesArray;
}

document
  .querySelectorAll('.password-box > svg')
  .forEach((item) => item.addEventListener('click', switchPasswordVisibility));

function switchPasswordVisibility(event) {
  const target = event.target.closest('svg');
  const connection = target.dataset.connectTo;

  const passwordInput = document.querySelector(`input[name="${connection}"]`);
  if (passwordInput.type == 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}

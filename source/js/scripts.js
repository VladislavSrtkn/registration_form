import intlTelInput from 'intl-tel-input';

import { validation, checkForErrors } from './validation_functions';

import { userData, saveUserData, makeOutputForUserData } from './user_data';

import Cropper from 'cropperjs';

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
  saveUserData(formData);

  changeRegistrationStep(containerNumber, 'forward');

  const lastStep = document.querySelectorAll('div[data-step]').length - 1;

  if (containerNumber == lastStep) {
    const userDataOutputObj = makeOutputForUserData(userData);

    displayUserData(userDataOutputObj);
  }
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
  const currentContainer = document.querySelector(
    `div[data-step="${currentStep}"`
  );
  currentContainer.classList.add('d-none');

  let nextStep;

  if (direction == 'forward') {
    nextStep = +currentStep + 1;
  }
  if (direction == 'back') {
    nextStep = +currentStep - 1;
  }

  const nextContainer = document.querySelector(`div[data-step="${nextStep}"`);
  nextContainer.classList.remove('d-none');
}

function displayErrors(errorsObj) {
  for (const error in errorsObj) {
    const errorMessage = errorsObj[error];

    const input = document.querySelector(`[name="${error}"]`);
    input.classList.add('is-invalid');

    const feedbackContainer = document.querySelector(
      `div[data-invalid-feedback="${error}"`
    );
    feedbackContainer.innerHTML = errorMessage;
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
  const currentSelectName = event.target.name;
  const currentSelectNumber = +event.target.dataset.chainOfSelects;
  const nextSelectNumber = currentSelectNumber + 1;

  const pickedValue = event.target.value;
  if (pickedValue == 'Other') {
    hideElement(`${currentSelectName}${nextSelectNumber}`);
    displayDependentInput(currentSelectName);
    return;
  }

  const dependentSelect = document.querySelector(
    `select[data-chain-of-selects="${nextSelectNumber}"]`
  );

  if (!dependentSelect) {
    return;
  }
  hideElement(`${currentSelectName}Other`);

  const valuesArray = getValuesForSelect(pickedValue);

  displayDependentSelect(valuesArray, currentSelectName, nextSelectNumber);
}

function displayDependentInput(name) {
  const input = document.querySelector(`input[name="${name}Other"]`);
  const inputHeader = document.querySelector(
    `[data-chain-of-selects-head="${name}Other"]`
  );

  inputHeader.classList.remove('d-none');
  input.classList.remove('d-none');
}

function hideElement(name) {
  const elem = document.querySelector(`[name="${name}"]`);
  const elemHeader = document.querySelector(
    `[data-chain-of-selects-head="${name}"]`
  );
  elem.value = '';
  elemHeader.classList.add('d-none');
  elem.classList.add('d-none');
}

function displayDependentSelect(valuesArray, name, number) {
  const selectElem = document.querySelector(
    `select[data-chain-of-selects="${number}"]`
  );
  const selectElemHeader = document.querySelector(
    `[data-chain-of-selects-head="${name}${number}"]`
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
    Sport: ['Football', 'Hockey', 'Basketball', 'Golf', 'Ski'],
    Games: ['Dota', 'Counter-strike', 'World of Warcraft', 'PUBG'],
    Cinema: ['Comedy', 'Drama', 'Horror', 'Thriller'],
  };

  const valuesArray = ['...'];

  if (selectValues[value]) {
    valuesArray.push(...selectValues[value]);
  }

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

document
  .querySelector('#userPic')
  .addEventListener('change', setPictureForCrop);

function setPictureForCrop(event) {
  const formData = new FormData(event.target.closest('form'));
  const link = formData.get('userPic');

  const imageWrapper = document.querySelector('#cropWrapper');
  imageWrapper.innerHTML = '';

  const previewContainer = document.querySelector('#preview');
  previewContainer.src = '';

  const image = document.createElement('img');
  image.src = URL.createObjectURL(link);
  image.id = 'userPicForCrop';
  imageWrapper.append(image);

  cropImage();
}

function cropImage() {
  const image = document.querySelector('#userPicForCrop');
  const button = document.querySelector('#cropButton');
  const resultUserPic = document.querySelector('#resultUserPic');
  const preview = document.querySelector('#preview');
  const cropCheck = document.querySelector('input[name="checkCrop"]');
  preview.classList.add('d-none');

  cropCheck.checked = false;

  let croppable = false;
  const cropper = new Cropper(image, {
    aspectRatio: 1,
    viewMode: 1,
    ready: function () {
      croppable = true;
      this.zoomable = false;
    },
  });

  button.classList.remove('d-none');

  button.onclick = function () {
    if (!croppable) {
      return;
    }

    const croppedCanvas = cropper.getCroppedCanvas();

    const roundedCanvas = getRoundedCanvas(croppedCanvas);

    document.querySelector('.cropper-container').classList.add('d-none');

    preview.classList.remove('d-none');
    preview.src = roundedCanvas.toDataURL();
    button.classList.add('d-none');

    cropCheck.checked = true;

    resultUserPic.src = roundedCanvas.toDataURL();
  };
}

function getRoundedCanvas(sourceCanvas) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const width = sourceCanvas.width;
  const height = sourceCanvas.height;

  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = 'destination-in';
  context.beginPath();
  context.arc(
    width / 2,
    height / 2,
    Math.min(width, height) / 2,
    0,
    2 * Math.PI,
    true
  );
  context.fill();
  return canvas;
}

function displayUserData(userDataOutputObj) {
  for (const string in userDataOutputObj) {
    const userData = userDataOutputObj[string];
    const container = document.createElement('p');
    container.innerHTML = userData;

    const userInfoContainer = document.querySelector('#userInfoContainer');
    userInfoContainer.append(container);
  }
}

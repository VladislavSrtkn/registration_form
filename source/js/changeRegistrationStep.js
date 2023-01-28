import { getValidationFunction } from './validationFunctions';
import { userData, saveUserData, makeOutputForUserData } from './userData';
import _, { isEmpty } from 'lodash';
import { displayErrors, clearValidationErrors } from './errors';
import changeProgressBar from './changeProgressBar';
import displayUserData from './displayUserData';

function goNextStep(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const container = event.target.closest('div[data-step]');
  const containerNumber = container.dataset.step;
  const countOfSteps = document.querySelectorAll('div[data-step]').length;

  const validate = getValidationFunction(containerNumber);
  const errors = validate(formData);

  clearValidationErrors();

  if (!isEmpty(errors)) {
    displayErrors(errors);
    return;
  }

  saveUserData(formData);

  changeRegistrationStep(containerNumber, 'forward');

  const lastStep = countOfSteps - 1;

  if (containerNumber == lastStep) {
    const userDataOutputObj = makeOutputForUserData(userData);

    displayUserData(userDataOutputObj);
  }
}

function goPreviousStep(event) {
  event.preventDefault();
  const container = event.target.closest('div[data-step]');
  const containerNumber = container.dataset.step;
  const direction = event.target.dataset.btn;

  changeRegistrationStep(containerNumber, direction);
}

function changeRegistrationStep(currentStep, direction) {
  const currentContainer = document.querySelector(`div[data-step="${currentStep}"`);
  currentContainer.classList.add('d-none');

  let nextStep;

  if (direction == 'forward') {
    nextStep = +currentStep + 1;
  }
  if (direction == 'back') {
    nextStep = +currentStep - 1;
  }

  changeProgressBar(nextStep);

  const nextContainer = document.querySelector(`div[data-step="${nextStep}"`);
  nextContainer.classList.remove('d-none');
}

export { goNextStep, goPreviousStep };

import intlTelInput from 'intl-tel-input';
import switchPasswordVisibility from './switchPasswordVisibility';
import showNextSelect from './displayingSelects';
import setPictureForCrop from './cropUserPicture';
import { goNextStep, goPreviousStep } from './changeRegistrationStep';

// Registration step`s changing

document.querySelectorAll('form').forEach((form) => {
  form.addEventListener('submit', goNextStep);
});

document
  .querySelectorAll('button[data-btn="back"]')
  .forEach((button) => button.addEventListener('click', goPreviousStep));

// Selects inputs

document
  .querySelectorAll('select')
  .forEach((elem) => elem.addEventListener('change', showNextSelect));

// Phone input

intlTelInput(document.querySelector('input[name="phoneNumber"]'), {
  preferredCountries: ['me', 'ca'],
});

// User`s picture

document.querySelector('#userPic').addEventListener('change', setPictureForCrop);

// Password visibility

document
  .querySelectorAll('.password-box > svg')
  .forEach((item) => item.addEventListener('click', switchPasswordVisibility));

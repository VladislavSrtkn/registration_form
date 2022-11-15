import intlTelInput from 'intl-tel-input';

import {
  checkName,
  checkDateOfBirth,
  checkEmail,
  checkPasswordLength,
  checkPasswordsMatch,
} from './validation_functions';

import { User } from './user_data_functions';

intlTelInput(document.querySelector('#phone'), {
  preferredCountries: ['me', 'ca'],
});

document
  .querySelector('#registrationForm')
  .addEventListener('submit', registrationFormSubmit);

function registrationFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const dateOfBirth = formData.get('dateOfBirth');
  const email = formData.get('email');
  const phoneNumber = formData.get('phoneNumber');
  const gender = formData.get('gender');
  const password = formData.get('password');
  const repeatPassword = formData.get('repeatPassword');

  if (!checkPasswordLength(password)) {
    document
      .querySelector('input[name="password"]')
      .classList.add('is-invalid');

    return;
  } else {
    document.querySelector('#password').classList.remove('is-invalid');
  }

  if (!checkPasswordsMatch(password, repeatPassword)) {
    document.querySelector('#repeatPassword').classList.add('is-invalid');
    return;
  } else {
    document.querySelector('#repeatPassword').classList.remove('is-invalid');
  }

  const user = new User(
    firstName,
    lastName,
    dateOfBirth,
    email,
    phoneNumber,
    gender,
    password
  );

  console.log(user);
}

document.querySelector('#goStep2').addEventListener('click', goToStep2);

function goToStep2() {
  event.preventDefault();
  const step1 = document.querySelector('#step1');
  step1.classList.add('was-validated');

  if (!checkName()) {
    return;
  }

  step1.classList.add('d-none');

  const step2 = document.querySelector('#step2');
  step2.classList.remove('d-none');
}

document.querySelector('#goStep3').addEventListener('click', goToStep3);

function goToStep3() {
  event.preventDefault();
  const dateInput = document.querySelector('#dateOfBirth');

  if (!checkDateOfBirth()) {
    dateInput.classList.add('is-invalid');
    return false;
  }

  const step2 = document.querySelector('#step2');
  step2.classList.add('d-none');

  const step3 = document.querySelector('#step3');
  step3.classList.remove('d-none');
}

document.querySelector('#goStep4').addEventListener('click', goToStep4);

function goToStep4() {
  event.preventDefault();

  const email = document.querySelector('#email');
  const step3 = document.querySelector('#step3');

  if (!checkEmail(email.value)) {
    step3.classList.add('was-validated');
    return;
  }

  step3.classList.add('d-none');

  const step4 = document.querySelector('#step4');
  step4.classList.remove('d-none');
}

document.querySelector('#goStep5').addEventListener('click', goToStep5);

function goToStep5() {
  event.preventDefault();

  const step4 = document.querySelector('#step4');
  step4.classList.add('d-none');

  const step5 = document.querySelector('#step5');
  step5.classList.remove('d-none');
}

document.querySelector('#goStep6').addEventListener('click', goToStep6);

function goToStep6() {
  event.preventDefault();

  const step5 = document.querySelector('#step5');
  step5.classList.add('d-none');

  const step6 = document.querySelector('#step6');
  step6.classList.remove('d-none');
}

document.querySelector('#password').addEventListener('change', () => {
  const password = document.querySelector('#password');
  if (checkPasswordLength(password.value)) {
    password.classList.remove('is-invalid');
  }
});

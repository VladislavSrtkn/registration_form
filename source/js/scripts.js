import intlTelInput from 'intl-tel-input';

const input = document.querySelector('#phone');
intlTelInput(input, {
  preferredCountries: ['me', 'ca'],
  // any initialisation options go here
});

document.querySelectorAll('.needs-validation').forEach((form) => {
  form.addEventListener(
    'submit',
    (event) => {
      // if (!form.checkValidity()) {
      //   // event.preventDefault();
      //   // event.stopPropagation();
      // }
      form.classList.add('was-validated');
    }
    //   false
  );
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
  const phoneNumber = formData.get('phoneNumber');
  const gender = formData.get('gender');
  const password = formData.get('password');

  console.log(firstName, lastName, dateOfBirth, phoneNumber, gender, password);
}

document.querySelector('#goStep2').addEventListener('click', goToStep2);

function goToStep2() {
  event.preventDefault();
  const step1 = document.querySelector('#step1');
  step1.classList.add('was-validated');

  const firstName = document.querySelector('#firstName');
  const lastName = document.querySelector('#lastName');

  if (!checkName(firstName, lastName)) {
    return;
  }

  step1.classList.add('d-none');

  const step2 = document.querySelector('#step2');
  step2.classList.remove('d-none');
}

function checkName(firstName, lastName) {
  if (firstName.value == '' || lastName.value == '') {
    return false;
  }
  return true;
}

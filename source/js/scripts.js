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

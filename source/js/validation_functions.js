export { validation, checkForErrors };

function checkForErrors(errorsObj) {
  for (const error in errorsObj) {
    return true;
  }
  return false;
}

const validation = {
  checkStep1(formData) {
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const errors = {};

    if (firstName == '') {
      errors.firstName = 'The field "name" cannot be empty';
    }
    if (lastName == '') {
      errors.lastName = 'The field "last name" cannot be empty';
    }

    return errors;
  },
  checkStep2(formData) {
    const dateOfBirth = formData.get('dateOfBirth');
    const today = new Date();
    const errors = {};

    if (today < new Date(dateOfBirth)) {
      errors.dateOfBirth =
        'Date of birth cannot be later than the current date';
    }
    if (!dateOfBirth) {
      errors.dateOfBirth = 'The field "date of birth" cannot be empty';
    }

    return errors;
  },
  checkStep3(formData) {
    let email = formData.get('email');
    const errors = {};

    if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      errors.email = 'Please enter a valid email';
    }
    if (!email) {
      errors.email = 'The field "email" cannot be empty';
    }

    return errors;
  },
  checkStep4(formData) {
    const phoneNumber = formData.get('phoneNumber');
    const errors = {};

    if (phoneNumber.length < 6) {
      errors.phoneNumber = 'Invalid phone number length';
    }

    return errors;
  },
  checkStep5(formData) {
    const gender = formData.get('gender');
    const errors = {};

    if (!gender) {
      errors.gender = 'Please select your gender';
    }

    return errors;
  },
  checkStep6(formData) {
    const password = formData.get('password');
    const repeatPassword = formData.get('repeatPassword');
    const errors = {};

    if (password.length < 6) {
      errors.password = 'Password cannot be shorter than 6 characters';
      return errors;
    }
    if (repeatPassword != password) {
      errors.repeatPassword = 'The entered passwords do not match';
    }

    return errors;
  },
};

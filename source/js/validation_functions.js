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
    const email = formData.get('email');
    const errors = {};

    if (!email.match(/^\w+@{1}\w+[.]\w+$/g)) {
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
    const hobby = formData.get('hobby');
    const hobby2 = formData.get('hobby2');
    const hobbyOther = formData.get('hobbyOther');
    const errors = {};

    if (hobby == '...') {
      errors.hobby = 'Please select your hobby from the list';
      return errors;
    }

    if (!hobbyOther && (hobby2 == '...' || !hobby2)) {
      errors.hobby2 = 'The field "interests" cannot be empty';
    }

    return errors;
  },
  checkStep7(formData) {
    const password = formData.get('password');
    const repeatPassword = formData.get('repeatPassword');
    const errors = {};

    if (password.length < 6) {
      errors.password = 'Password cannot be shorter than 6 characters';
      return errors;
    }
    if (
      !(
        password.match(/[a-z]/) &&
        password.match(/[A-Z]/) &&
        password.match(/\d/) &&
        password.match(/\p{P}/u)
      )
    ) {
      errors.password =
        'The password must contain lowercase and uppercase letters, numbers and a special character';
      return errors;
    }
    if (repeatPassword != password) {
      errors.repeatPassword = 'The entered passwords do not match';
    }

    return errors;
  },
  checkStep8(formData) {
    const picture = formData.get('userPic');
    const preview = formData.get('checkCrop');
    const errors = {};

    if (picture.name == '') {
      errors.userPic = 'Please upload your avatar';
      return errors;
    }
    if (preview == null) {
      errors.userPic = 'Please crop your avatar';
    }

    return errors;
  },
  checkStep9(formData) {
    const privacyPolicy = formData.get('privacyPolicy');
    const errors = {};

    if (!privacyPolicy) {
      errors.privacyPolicy =
        'Please confirm your agreement with the privacy policy';
    }
    return errors;
  },
};

export { validation, checkForErrors };

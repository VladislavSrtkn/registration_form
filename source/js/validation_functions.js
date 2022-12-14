import isFuture from 'date-fns/isFuture';
import differenceInYears from 'date-fns/differenceInYears';

function getValidationFunction(step) {
  const validationFunctions = {
    checkStep1,
    checkStep2,
    checkStep3,
    checkStep4,
    checkStep5,
    checkStep6,
    checkStep7,
    checkStep8,
    checkStep9,
  };

  const functionName = `checkStep${step}`;
  if (functionName in validationFunctions) {
    return validationFunctions[functionName];
  }

  throw new Error(`No validation function for step ${step}`);
}

function validateRequiredField(value, name, label, errors) {
  if (value === '') {
    errors[name] = `The field "${label}" cannot be empty`;
    return false;
  }
  return true;
}

function checkStep1(formData) {
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const errors = {};

  validateRequiredField(firstName, 'firstName', 'first name', errors);
  validateRequiredField(lastName, 'lastName', 'last name', errors);

  return errors;
}

function checkStep2(formData) {
  const dateOfBirth = formData.get('dateOfBirth');
  const errors = {};

  if (!validateRequiredField(dateOfBirth, 'dateOfBirth', 'date of birth', errors)) {
    return errors;
  }

  if (isFuture(new Date(dateOfBirth))) {
    errors.dateOfBirth = 'Date of birth cannot be later than the current date';
    return errors;
  }

  if (differenceInYears(new Date(), new Date(dateOfBirth)) < 18) {
    errors.dateOfBirth = 'Registration is available only from 18 years old';
  }

  return errors;
}

function checkStep3(formData) {
  const email = formData.get('email');
  const errors = {};

  if (!email.match(/^\w+@{1}\w+[.]\w+$/g)) {
    errors.email = 'Please enter a valid email';
  }

  validateRequiredField(email, 'email', 'email', errors);

  return errors;
}

function checkStep4(formData) {
  const phoneNumber = formData.get('phoneNumber');
  const errors = {};

  if (phoneNumber.length < 6) {
    errors.phoneNumber = 'Invalid phone number length';
  }

  return errors;
}

function checkStep5(formData) {
  const gender = formData.get('gender');
  const errors = {};

  if (!gender) {
    errors.gender = 'Please select your gender';
  }

  return errors;
}

function checkStep6(formData) {
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
}

function checkStep7(formData) {
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
}

function checkStep8(formData) {
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
}

function checkStep9(formData) {
  const privacyPolicy = formData.get('privacyPolicy');
  const errors = {};

  if (!privacyPolicy) {
    errors.privacyPolicy = 'Please confirm your agreement with the privacy policy';
  }
  return errors;
}

export { getValidationFunction };

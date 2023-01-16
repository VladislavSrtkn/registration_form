import validateRequiredField from './validateRequiredField';
import validateDateOfBirth from './validateDateOfBirth';
import validateEmail from './validateEmail';
import validatePasswords from './validatePasswords';
import validateAvatar from './validateAvatar';

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
  let errors = {};

  validateDateOfBirth(dateOfBirth, errors);

  return errors;
}

function checkStep3(formData) {
  const email = formData.get('email');
  const errors = {};

  validateEmail(email, errors);

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

  validateRequiredField(gender, 'gender', 'gender', errors, 'The field "gender" cannot be empty');

  return errors;
}

function checkStep6(formData) {
  const hobby = formData.get('hobby');
  const hobby2 = formData.get('hobby2');
  const hobbyOther = formData.get('hobbyOther');
  const errors = {};

  if (!validateRequiredField(hobby, 'hobby', 'hobby', errors)) {
    return errors;
  }

  if (
    !validateRequiredField(hobby2, 'hobby2', 'interests', errors) &&
    !validateRequiredField(hobbyOther, 'hobbyOther', 'interests', errors)
  ) {
    return errors;
  }
}

function checkStep7(formData) {
  const password = formData.get('password');
  const repeatPassword = formData.get('repeatPassword');
  const errors = {};

  validatePasswords(password, repeatPassword, errors);

  return errors;
}

function checkStep8(formData) {
  const picture = formData.get('userPic');
  const preview = formData.get('checkCrop');
  const errors = {};

  validateAvatar(picture, preview, errors);

  return errors;
}

function checkStep9(formData) {
  const privacyPolicy = formData.get('privacyPolicy');
  const errors = {};

  validateRequiredField(
    privacyPolicy,
    'privacyPolicy',
    'privacy policy',
    errors,
    'Please confirm your agreement with the privacy policy'
  );

  return errors;
}

export { getValidationFunction };

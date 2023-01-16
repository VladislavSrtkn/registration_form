import validateRequiredField from './validateRequiredField';

export default function validatePasswords(password, repeatPassword, errors) {
  if (password.length < 6) {
    errors['password'] = 'Password cannot be shorter than 6 characters';
    return;
  }
  if (
    !(
      password.match(/[a-z]/) &&
      password.match(/[A-Z]/) &&
      password.match(/\d/) &&
      password.match(/\p{P}/u)
    )
  ) {
    errors['password'] =
      'The password must contain lowercase and uppercase letters, numbers and a special character';
    return;
  }
  if (repeatPassword !== password) {
    errors['repeatPassword'] = 'The entered passwords do not match';
  }
}

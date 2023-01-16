import validateRequiredField from './validateRequiredField';

export default function validateEmail(email, errors) {
  if (!validateRequiredField(email, 'email', 'email', errors)) {
    return;
  }
  if (!email.match(/^\w+@{1}\w+[.]\w+$/g)) {
    errors['email'] = 'Please enter a valid email';
  }
}

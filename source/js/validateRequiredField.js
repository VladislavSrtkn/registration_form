export default function validateRequiredField(value, name, label, errors, errorMessage) {
  if (value === '' || value === null) {
    errors[name] = errorMessage || `The field "${label}" cannot be empty`;
    return false;
  }
  return true;
}

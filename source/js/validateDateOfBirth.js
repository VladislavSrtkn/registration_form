import validateRequiredField from './validateRequiredField';
import isFuture from 'date-fns/isFuture';
import parse from 'date-fns/parse';
import differenceInYears from 'date-fns/differenceInYears';

export default function validateDateOfBirth(dateOfBirth, errors) {
  if (!validateRequiredField(dateOfBirth, 'dateOfBirth', 'date of birth', errors)) {
    return;
  }

  const parsedDateOfBirth = parse(dateOfBirth, 'yyyy-MM-dd', new Date());

  if (isFuture(parsedDateOfBirth)) {
    errors['dateOfBirth'] = 'Date of birth cannot be later than the current date';
    return;
  }
  if (differenceInYears(new Date(), parsedDateOfBirth) < 18) {
    errors['dateOfBirth'] = 'Registration is available only from 18 years old';
  }
}

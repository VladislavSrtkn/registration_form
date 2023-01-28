import isFuture from 'date-fns/isFuture';
import parse from 'date-fns/parse';
import differenceInYears from 'date-fns/differenceInYears';
import { isValid } from 'date-fns';

export default function validateDateOfBirth(date, month, year, errors) {
  const parsedDateOfBirth = parse(`${date}-${month}-${year}`, 'dd-MM-yyyy', new Date());

  if (!isValid(parsedDateOfBirth)) {
    errors['dateOfBirth'] = 'The date you entered does not exist. Please check the data';
    return;
  }

  if (isFuture(parsedDateOfBirth)) {
    errors['dateOfBirth'] = 'Date of birth cannot be later than the current date';
    return;
  }

  if (differenceInYears(new Date(), parsedDateOfBirth) < 18) {
    errors['dateOfBirth'] = 'Registration is available only from 18 years old';
    return;
  }

  if (differenceInYears(new Date(), parsedDateOfBirth) > 122) {
    errors['dateOfBirth'] =
      'The world record for longevity belongs to Jeanne Calment. She lived 122 years and 164 days. If you are older than her, please write to us. The world needs to know about this!';
  }
}

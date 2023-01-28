import format from 'date-fns/format';
import parse from 'date-fns/parse';

const userData = {};

function saveUserData(formData) {
  for (const [fieldName, value] of formData.entries()) {
    userData[fieldName] = value;
  }
}

function makeOutputForUserData(userDataObj) {
  const parsedDateOfBirth = parse(
    `${userDataObj.dayOfBirth}-${userDataObj.monthOfBitrh}-${userDataObj.yearOfBirth}`,
    'dd-MM-yyyy',
    new Date()
  );
  const formattedDateOfBirth = format(parsedDateOfBirth, 'do MMM y');

  const formattedHobbyInfo =
    userDataObj.hobbyOther == ''
      ? `${userDataObj.hobby}, ${userDataObj.hobby2}`
      : userDataObj.hobbyOther;

  const userDataOutput = {
    name: `Name: ${userDataObj.firstName}`,
    lastName: `Last name: ${userDataObj.lastName} `,
    gender: `Gender: ${userDataObj.gender}`,
    dateOfBirth: `Date of birth: ${formattedDateOfBirth}`,
    email: `Email: ${userDataObj.email}`,
    phoneNumber: `Phone: ${userDataObj.phoneNumber}`,
    hobby: `Hobby: ${formattedHobbyInfo}`,
  };

  return userDataOutput;
}

export { userData, saveUserData, makeOutputForUserData };

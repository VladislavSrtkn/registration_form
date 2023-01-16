import format from 'date-fns/format';
import parse from 'date-fns/parse';

const userData = {};

function saveUserData(formData) {
  for (const [fieldName, value] of formData.entries()) {
    userData[fieldName] = value;
  }
}

function makeOutputForUserData(userDataObj) {
  const userDataOutput = {
    name: `Name: ${userDataObj.firstName}`,
    lastName: `Last name: ${userDataObj.lastName} `,
    gender: `Gender: ${userDataObj.gender}`,
    dateOfBirth: `Date of birth: ${format(
      parse(userData.dateOfBirth, 'yyyy-MM-dd', new Date()),
      'do MMM y'
    )}`,
    email: `Email: ${userDataObj.email}`,
    phoneNumber: `Phone: ${userDataObj.phoneNumber}`,
    hobby: `Hobby: ${
      userDataObj.hobbyOther == ''
        ? userData.hobby + ', ' + userData.hobby2
        : userDataObj.hobbyOther
    }`,
  };

  return userDataOutput;
}

export { userData, saveUserData, makeOutputForUserData };

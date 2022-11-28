import format from 'date-fns/format';

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
      new Date(userDataObj.dateOfBirth),
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

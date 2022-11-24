const userData = {};

function saveUserData(formData) {
  for (const param of formData.entries()) {
    userData[param[0]] = param[1];
  }
}

function makeOutputForUserData(userDataObj) {
  const userDataOutput = {
    name: `Name: ${userDataObj.firstName}`,
    lastName: `Last name: ${userDataObj.lastName} `,
    gender: `Gender: ${userDataObj.gender}`,
    dateOfBirth: `Date of birth: ${userDataObj.dateOfBirth}`,
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

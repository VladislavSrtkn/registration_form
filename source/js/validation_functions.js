export {
  checkName,
  checkDateOfBirth,
  checkEmail,
  checkPhoneNumber,
  checkPasswordLength,
  checkPasswordsMatch,
};

function checkName() {
  const firstName = document.querySelector('#firstName');
  const lastName = document.querySelector('#lastName');

  if (firstName.value == '' || lastName.value == '') {
    return false;
  }
  return true;
}

function checkDateOfBirth() {
  const dateOfBirth = document.querySelector('#dateOfBirth').value;
  const today = new Date();

  if (today < new Date(dateOfBirth) || !dateOfBirth) {
    return false;
  } else {
    return true;
  }
}

function checkEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function checkPhoneNumber(number) {
  if (number.length < 6) {
    return false;
  } else {
    return true;
  }
}

function checkPasswordLength(password) {
  if (password.length < 6) {
    return false;
  } else {
    return true;
  }
}

function checkPasswordsMatch(password, repeat) {
  if (password != repeat) {
    return false;
  } else {
    return true;
  }
}

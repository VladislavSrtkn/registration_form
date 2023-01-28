export default function displayUserData(userDataOutputObj) {
  for (const userData in userDataOutputObj) {
    const userDataString = userDataOutputObj[userData];
    const container = document.createElement('p');
    container.innerHTML = userDataString;

    const userInfoContainer = document.querySelector('#userInfoContainer');
    userInfoContainer.append(container);
  }
}

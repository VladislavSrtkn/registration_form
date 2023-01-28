export default function showNextSelect(event) {
  const currentSelectName = event.target.name;
  const currentSelectNumber = +event.target.dataset.chainOfSelects;
  const nextSelectNumber = currentSelectNumber + 1;

  const pickedValue = event.target.value;
  if (pickedValue == 'Other') {
    hideInputWithHeader(`${currentSelectName}${nextSelectNumber}`);
    displayDependentInput(currentSelectName);
    return;
  }

  const dependentSelect = document.querySelector(
    `select[data-chain-of-selects="${nextSelectNumber}"][name="${currentSelectName}${nextSelectNumber}"]`
  );

  if (!dependentSelect) {
    return;
  }
  hideInputWithHeader(`${currentSelectName}Other`);

  const valuesArray = getValuesForSelect(pickedValue);

  displayDependentSelect(valuesArray, currentSelectName, nextSelectNumber);
}

function displayDependentInput(name) {
  const input = document.querySelector(`input[name="${name}Other"]`);
  const inputHeader = document.querySelector(`[data-chain-of-selects-head="${name}Other"]`);

  inputHeader.classList.remove('d-none');
  input.classList.remove('d-none');
}

function displayDependentSelect(valuesArray, name, number) {
  const selectElem = document.querySelector(
    `select[data-chain-of-selects="${number}"][name="${name}${number}"]`
  );
  const selectElemHeader = document.querySelector(
    `[data-chain-of-selects-head="${name}${number}"]`
  );

  selectElemHeader.classList.remove('d-none');

  selectElem.classList.remove('d-none');
  selectElem.innerHTML = '';

  for (const value of valuesArray) {
    const selectOption = document.createElement('option');
    selectOption.innerHTML = value;
    selectOption.value = value;

    selectElem.append(selectOption);
  }
}

function hideInputWithHeader(name) {
  const elem = document.querySelector(`[name="${name}"]`);
  const elemHeader = document.querySelector(`[data-chain-of-selects-head="${name}"]`);
  elem.value = '';
  elemHeader.classList.add('d-none');
  elem.classList.add('d-none');
}

function getValuesForSelect(value) {
  const selectValues = {
    Sport: ['Football', 'Hockey', 'Basketball', 'Golf', 'Ski'],
    Games: ['Dota', 'Counter-strike', 'World of Warcraft', 'PUBG'],
    Cinema: ['Comedy', 'Drama', 'Horror', 'Thriller'],
  };

  const valuesArray = [''];

  if (selectValues[value]) {
    valuesArray.push(...selectValues[value]);
  }

  return valuesArray;
}

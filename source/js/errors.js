function displayErrors(errorsObj) {
  for (const error in errorsObj) {
    const errorMessage = errorsObj[error];

    const input = document.querySelector(`[name="${error}"]`);
    if (input) {
      input.classList.add('is-invalid');
    }

    const feedbackContainer = document.querySelector(`div[data-invalid-feedback="${error}"`);

    if (feedbackContainer) {
      feedbackContainer.innerHTML = errorMessage;
    }
  }
}

function clearValidationErrors() {
  document.querySelectorAll('.is-invalid').forEach((input) => input.classList.remove('is-invalid'));

  document.querySelectorAll('.invalid-feedback').forEach((container) => (container.innerHTML = ''));
}

export { displayErrors, clearValidationErrors };

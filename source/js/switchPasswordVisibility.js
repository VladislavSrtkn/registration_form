export default function switchPasswordVisibility(event) {
  const target = event.target.closest('svg');
  const connection = target.dataset.connectTo;

  const passwordInput = document.querySelector(`input[name="${connection}"]`);
  if (passwordInput.type == 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
}

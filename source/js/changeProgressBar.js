export default function changeProgressBar(step) {
  const progressBar = document.querySelector('.progress-bar');
  const totalSteps = document.querySelectorAll('div[data-step]').length;

  const progressPercent = (step / totalSteps) * 100;

  progressBar.style.width = `${progressPercent}%`;
}

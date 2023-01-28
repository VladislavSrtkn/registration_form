import Cropper from 'cropperjs';

export default function setPictureForCrop(event) {
  const formData = new FormData(event.target.closest('form'));
  const link = formData.get('userPic');

  const imageWrapper = document.querySelector('#cropWrapper');
  imageWrapper.innerHTML = '';

  const previewContainer = document.querySelector('#preview');
  previewContainer.src = '';

  const image = document.createElement('img');
  image.src = URL.createObjectURL(link);
  image.id = 'userPicForCrop';
  imageWrapper.append(image);

  cropImage();
}

function getRoundedCanvas(sourceCanvas) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const width = sourceCanvas.width;
  const height = sourceCanvas.height;

  canvas.width = width;
  canvas.height = height;
  context.imageSmoothingEnabled = true;
  context.drawImage(sourceCanvas, 0, 0, width, height);
  context.globalCompositeOperation = 'destination-in';
  context.beginPath();
  context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
  context.fill();
  return canvas;
}

function cropImage() {
  const image = document.querySelector('#userPicForCrop');
  const button = document.querySelector('#cropButton');

  const preview = document.querySelector('#preview');
  const resultUserPic = document.querySelector('#resultUserPic');

  const cropCheck = document.querySelector('input[name="checkCrop"]');

  preview.classList.add('d-none');

  cropCheck.checked = false;

  let croppable = false;
  const cropper = new Cropper(image, {
    aspectRatio: 1,
    viewMode: 1,
    ready: function () {
      croppable = true;
      this.zoomable = false;
    },
  });

  button.classList.remove('d-none');

  button.onclick = function () {
    if (!croppable) {
      return;
    }

    const croppedCanvas = cropper.getCroppedCanvas();

    const roundedCanvas = getRoundedCanvas(croppedCanvas);

    document.querySelector('.cropper-container').classList.add('d-none');

    preview.classList.remove('d-none');
    preview.src = roundedCanvas.toDataURL();
    button.classList.add('d-none');

    cropCheck.checked = true;

    resultUserPic.src = roundedCanvas.toDataURL();
  };
}

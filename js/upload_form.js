import { transformImage } from './image_scale.js';
import { createSlider } from './image_filter.js';
import { sendData } from './api.js';
import { checkingHashtag } from './cheking_hashtag.js';
import { modalError, modalSucces } from './modal.js';

const uploadSelectImage = document.querySelector('.img-upload__form');
const imgUploadOverlay = uploadSelectImage.querySelector('.img-upload__overlay');
const imgUploadcancel = uploadSelectImage.querySelector('.img-upload__cancel');
const imgUploadSubmit = uploadSelectImage.querySelector('.img-upload__submit');
const textHashtags = uploadSelectImage.querySelector('.text__hashtags');
const textDescription = uploadSelectImage.querySelector('.text__description');
const imgUploadInput = uploadSelectImage.querySelector('.img-upload__input');
const descriptionLength = 140;

const fileChooser = document.querySelector('#upload-file');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const preview = document.querySelector('.img-upload__preview').querySelector('img');

// функция проверки формы
const pristine = new Pristine(uploadSelectImage, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'pristine-error'
});


// функция проверки комментария
function checkTextDescription(text) {
  return text.length <= descriptionLength;
}

// функция вывода ошибки комментария
function errorTextDescription() {
  return `Максимальная длина комментария ${descriptionLength} символов!`;
}

//
const blockSubmit = () => {
  imgUploadSubmit.disabled = true;
};

const unblockSubmit = () => {
  imgUploadSubmit.disabled = false;
};


// функция проверки формы перед отправкой
const checkingForm = () => {
  const isValid = pristine.validate();
  if (isValid) {
    unblockSubmit();
  } else {
    blockSubmit();
  }
};

// функция закрытия формы загрузки картинки
const uploadClose = () => {
  imgUploadInput.value = '';
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadSelectImage.removeEventListener('input', checkingForm);
};


// функция отправки формы
const submitForm = (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  const formDate = new FormData(uploadSelectImage);
  blockSubmit();
  if (isValid) {
    evt.preventDefault();
    sendData(
      () => {
        modalSucces();
        unblockSubmit();
        uploadSelectImage.removeEventListener('submit', submitForm);
      },
      modalError,
      formDate);
  }
};

// функция отправки формы
const uploadSubmit = () => {
  uploadSelectImage.addEventListener('input', checkingForm);
  uploadSelectImage.addEventListener('submit', submitForm);
};

// функция отслеживания нажатия Esc
const tracksEscKeystrokes = (evt) => {
  if (evt.key === 'Escape') {
    const modal = document.querySelector('.modal');
    if (document.activeElement !== textHashtags && document.activeElement !== textDescription && modal === null) {
      uploadClose();
      document.removeEventListener('keydown', tracksEscKeystrokes);
      uploadSelectImage.removeEventListener('submit', submitForm);
    }
  }
};

const loadImage = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};


// функция открытия формы загрузки картинки
const uploadOpen = () => {
  loadImage();
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadSubmit();
  transformImage();
  createSlider();
  document.addEventListener('keydown', tracksEscKeystrokes);
  imgUploadcancel.addEventListener('click', () => {
    uploadClose();
    document.removeEventListener('keydown', tracksEscKeystrokes);
    uploadSelectImage.removeEventListener('submit', submitForm);
  });
};

pristine.addValidator(textDescription, checkTextDescription, errorTextDescription);
pristine.addValidator(textHashtags, checkingHashtag.checkTextHashtag, checkingHashtag.error);
uploadSelectImage.addEventListener('change', uploadOpen);

export { uploadClose, tracksEscKeystrokes, unblockSubmit };


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

// функция проверки формы
const pristine = new Pristine(uploadSelectImage, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});


// функция проверки комментария
function checkTextDescription(text) {
  return text.length <= descriptionLength;
}

// функция вывода ошибки комментария
function errorTextDescription() {
  return `Максимальная длина комментария ${descriptionLength} символов!`;
}


// функция проверки формы перед отправкой
const checkingForm = () => {
  const isValid = pristine.validate();
  if (isValid) {
    imgUploadSubmit.disabled = false;
  } else {
    imgUploadSubmit.disabled = true;
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
  if (isValid) {
    sendData(modalSucces, modalError, formDate);
    uploadSelectImage.removeEventListener('submit', submitForm);
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

// функция открытия формы загрузки картинки
const uploadOpen = () => {
  uploadSelectImage.addEventListener('change', () => {
    imgUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    uploadSubmit();

    transformImage();
    createSlider();

    document.addEventListener('keydown', tracksEscKeystrokes);
  });

  imgUploadcancel.addEventListener('click', () => {
    uploadClose();
    document.removeEventListener('keydown', tracksEscKeystrokes);
    uploadSelectImage.removeEventListener('submit', submitForm);
  });

  pristine.addValidator(textHashtags, checkingHashtag.checkTextHashtag, checkingHashtag.error);
  pristine.addValidator(textDescription, checkTextDescription, errorTextDescription);

  uploadClose();
};

// функция открытия формы загрузки картинки
uploadOpen();

export { uploadClose, tracksEscKeystrokes };


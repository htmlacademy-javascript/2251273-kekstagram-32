import { transformImage } from './image_scale.js';
import { createSlider } from './image_filter.js';


const uploadSelectImage = document.querySelector('.img-upload__form');
const imgUploadOverlay = uploadSelectImage.querySelector('.img-upload__overlay');
const imgUploadcancel = uploadSelectImage.querySelector('.img-upload__cancel');
const imgUploadSubmit = uploadSelectImage.querySelector('.img-upload__submit');
const textHashtags = uploadSelectImage.querySelector('.text__hashtags');
const textDescription = uploadSelectImage.querySelector('.text__description');
const imgUploadInput = uploadSelectImage.querySelector('.img-upload__input');

const hashtagLength = {
  MIN: 2,
  MAX: 20
};

const hashtagCount = {
  MAX: 5
};

const descriptionLength = 140;


const pristine = new Pristine(uploadSelectImage, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});


// функция проверки строки хэштега
const checkingHashtag = new function () {
  this.textError = '';
  this.error = () => this.textError;
  this.checkHashtag = (hashtag) => {
    const mask = /^#[a-z\u0430-\u044F\u04510-9]{1,19}$/i;
    if (!hashtag.startsWith('#')) {
      this.textError = `"${hashtag}" — Хэштег должен начинаться c символа "#"!`;
      return false;
    } else if (hashtag.lastIndexOf('#') !== 0) {
      this.textError = `"${hashtag}" — Хэштег должен содержать только один символ "#"!`;
      return false;
    } else if (hashtag.length === hashtagLength.MIN - 1) {
      this.textError = `"${hashtag}" — Хэштег должен содержать "#" и 1 символ!`;
      return false;
    } else if (hashtag.length > hashtagLength.MAX) {
      this.textError = `"${hashtag}" — Хэштег должен содержать не более 20 символов!`;
      return false;
    } else if (!mask.test(hashtag)) {
      this.textError = `"${hashtag}" — Хэштег может содержать только буквы и цифры!`;
      return false;
    }
    this.textError = '';
    return true;
  };
  this.checkDublicates = (arrayHashtags) => {
    const arrayHashtagsLower = arrayHashtags.map((item) => item.toLowerCase());
    const setHashtagsLower = new Set(arrayHashtagsLower);
    let answer = [];
    if (arrayHashtagsLower.length === setHashtagsLower.size) {
      return true;
    } else {
      for (const item of arrayHashtagsLower) {
        if (arrayHashtagsLower.indexOf(item) !== arrayHashtagsLower.lastIndexOf(item)) {
          answer.push(item);
        }
      }
      answer = [...new Set(answer)];
      this.textError = `Хэштег${answer.length > 1 ? 'и' : ''}" ${answer.join(', ')} " повторя${answer.length === 1 ? 'е' : 'ю'}тся! Хэштеги не должны повторяться!(регистр не имеет значения!)`;
      return false;
    }
  };
  this.checkTextHashtag = (textHashtag) => {
    if (!textHashtag.trim()) {
      this.textError = '';
      return true;
    } else {
      const arrayHashtags = textHashtag.trim().split(/\s+/);
      if (arrayHashtags.length > hashtagCount.MAX) {
        this.textError = `Максимальное количество хэштегов - ${hashtagCount.MAX}!`;
        return false;
      } else if (!this.checkDublicates(arrayHashtags)) {
        return false;
      } else {
        return arrayHashtags.every(this.checkHashtag);
      }
    }
  };
};

// функция проверки комментария
function checkTextDescription(text) {
  return text.length <= descriptionLength;
}

// функция вывода ошибки комментария
function errorTextDescription() {
  return `Максимальная длина комментария ${descriptionLength} символов!`;
}

// функция проверки формы перед отправкой
const checkingForm = (evt) => {
  const isValid = pristine.validate();
  if (isValid) {
    imgUploadSubmit.disabled = false;
  } else {
    evt.preventDefault();
    imgUploadSubmit.disabled = true;
  }
};

// функция отправки формы
const uploadSubmit = () => {
  uploadSelectImage.addEventListener('input', checkingForm);
};

// функция закрытия формы загрузки картинки
const uploadClose = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadSelectImage.removeEventListener('input', checkingForm);
};

// функция отслеживания нажатия Esc
const tracksEscKeystrokes = (evt) => {
  if (evt.key === 'Escape' && document.activeElement !== textHashtags && document.activeElement !== textDescription) {
    uploadClose();
    imgUploadInput.value = '';
    document.removeEventListener('keydown', tracksEscKeystrokes);
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
  });

  pristine.addValidator(textHashtags, checkingHashtag.checkTextHashtag, checkingHashtag.error);
  pristine.addValidator(textDescription, checkTextDescription, errorTextDescription);

  uploadClose();
};


export { uploadOpen };


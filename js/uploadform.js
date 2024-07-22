const uploadSelectImage = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadcancel = document.querySelector('.img-upload__cancel');
const imgUploadSubmit = document.querySelector('.img-upload__submit');

const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');


const hashtagLength = {
  MIN: 2,
  MAX: 20
};
const hashtagCount = {
  MAX: 5
};


const descriptionLength = 14;


const pristine = new Pristine(uploadSelectImage, {
  classTo: 'img-upload__field-wrapper', // что проверять
  errorClass: 'img-upload__field-wrapper--error', // добавить класс ошибки
  successClass: 'img-upload__field-wrapper', // удалить класс
  errorTextParent: 'img-upload__field-wrapper', // куда вставлять ошибку
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});


// функция скрытия кнопки
function hiddenSubmit(value) {
  if (!value) {
    imgUploadSubmit.disabled = true;
  } else {
    imgUploadSubmit.disabled = false;
  }
}

// функция вывода ошибки хэштега
const errorTextHashtag = new function (error) {
  this.answer = error;
  this.a = () => this.answer;
};


// функция проверки хэштега
const checkHashtag = (hashtag) => {
  const mask = /^#[a-z\u0430-\u044F\u04510-9]{1,19}$/i;
  if (!hashtag.startsWith('#')) {
    errorTextHashtag.answer = `"${hashtag}" — Хэштег должен начинаться c символа "#"!`;
    return false;
  } else if (hashtag.lastIndexOf('#') !== 0) {
    errorTextHashtag.answer = `"${hashtag}" — Хэштег должен содержать только один символ "#"!`;
    return false;
  } else if (hashtag.length === hashtagLength.MIN - 1) {
    errorTextHashtag.answer = `"${hashtag}" — Хэштег должен содержать "#" и 1 символ!`;
    return false;
  } else if (hashtag.length > hashtagLength.MAX) {
    errorTextHashtag.answer = `"${hashtag}" — Хэштег должен содержать не более 20 символов!`;
    return false;
  } else if (!mask.test(hashtag)) {
    errorTextHashtag.answer = `"${hashtag}" — Хэштег может содержать только буквы и цифры!`;
    return false;
  }
  return true;
};


// функция проверки текста поля хэштега
const checkTextHashtag = (text) => {
  if (text.trim()) {
    const arrayHashtags = text.trim().split(/\s+/).filter((item) => item.startsWith('#'));
    if (arrayHashtags.length > hashtagCount.MAX) {
      errorTextHashtag.answer = `Максимальное количество хэштегов - ${hashtagCount.MAX}! Вы ввели ${arrayHashtags.length}`;
      return false;
    } else {
      return arrayHashtags.every(checkHashtag);
    }
  } else {
    return true;
  }
};


// функция проверки комментария
function checkTextDescription(text) {
  hiddenSubmit(text.length <= descriptionLength);
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
    // console.log('Форма заполнена верно');
  } else {
    evt.preventDefault();
    // console.log('Форма заполнена неверно');
  }
};


// функция отправки формы
const uploadSubmit = () => {
  uploadSelectImage.addEventListener('submit', checkingForm);
};


// функция закрытия формы загрузки картинки
const uploadClose = () => {
  imgUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadSelectImage.removeEventListener('submit', checkingForm);
};

// функция отслеживания нажатия Esc
const tracksEscKeystrokes = (evt) => {
  if (evt.key === 'Escape' && document.activeElement !== textHashtags && document.activeElement !== textDescription) {
    uploadClose();
    document.removeEventListener('keydown', tracksEscKeystrokes);
  }
};

// функция открытия формы загрузки картинки
const uploadOpen = () => {
  uploadSelectImage.addEventListener('change', () => {
    imgUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    uploadSubmit();

    document.addEventListener('keydown', tracksEscKeystrokes);
  });

  imgUploadcancel.addEventListener('click', () => {
    uploadClose();
    document.removeEventListener('keydown', tracksEscKeystrokes);
  });


  pristine.addValidator(textHashtags, checkTextHashtag, errorTextHashtag.a);
  pristine.addValidator(textDescription, checkTextDescription, errorTextDescription);

  uploadClose();
};


export { uploadOpen };


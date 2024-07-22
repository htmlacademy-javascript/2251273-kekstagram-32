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
  // successClass: 'img-upload__field-wrapper', // удалить класс
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

// функция проверки хэштега
const checkHashtag = (hashtag) => {
  if (hashtag === '') {
    return true;
  } else if (!hashtag.startsWith('#')) {
    return false;
  } else if (hashtag.lastIndexOf('#') !== 0) {
    return false;
  } else if (hashtag.length === hashtagLength.MIN - 1) {
    return false;
  } else if (hashtag.length > hashtagLength.MAX) {
    return false;
  } else if (!(/^#[a-z\u0430-\u044F\u04510-9]{1,19}$/i).test(hashtag)) {
    return false;
  }
  return true;
};

// функция проверки текста поля хэштега
const checkTextHashtag = (text) => {
  const arrayHashtags = text.split(' ');
  if (arrayHashtags.length > hashtagCount.MAX) {
    return false;
  }
  return arrayHashtags.every(checkHashtag);
};

// функция вывода ошибки хэштега
function errorTextHashtag(text) {
  const mask = /^#[a-z\u0430-\u044F\u04510-9]{1,19}$/i;
  const arrayHashtags = text.split(' ');
  if (arrayHashtags.length > hashtagCount.MAX) {
    return 'Максимальное количество хэштегов 5!';
  }
  for (const item of arrayHashtags) {
    if (!item.startsWith('#')) {
      return `"${item}" — Хэштег должен начинаться c одного символа "#"!`;
    } else if (item.lastIndexOf('#') !== 0) {
      return `"${item}" — Хэштег должен содержать только один символ "#"!`;
    } else if (item.length === hashtagLength.MIN - 1) {
      return `"${item}" — Хэштег должен содержать "#" и 1 символ!`;
    } else if (item.length > hashtagLength.MAX) {
      return `"${item}" — Хэштег должен содержать не более 20 символов!`;
    } else if (!mask.test(item)) {
      return `"${item}" — Хэштег может содержать только буквы и цифры!`;
    }
  }
}


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


  pristine.addValidator(textHashtags, checkTextHashtag, errorTextHashtag);
  pristine.addValidator(textDescription, checkTextDescription, errorTextDescription);

  uploadClose();
};


export { uploadOpen };


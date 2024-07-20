// import { tracksEscKeystrokes } from './functions.js';

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
const descriptionLength = 14;


const pristine = new Pristine(uploadSelectImage, {
  classTo: 'img-upload__field-wrapper', // что проверять
  errorClass: 'img-upload__field-wrapper--error', // добавить класс ошибки
  // successClass: 'img-upload__field-wrapper', // удалить класс
  errorTextParent: 'img-upload__field-wrapper', // куда вставлять ошибку
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

// console.log(document.hasFocus(textHashtags));
// textDescription.hasFocus();



// функция скрытия кнопки
function hiddenSubmit (value) {
  if (!value) {
    imgUploadSubmit.disabled = true;
  } else {
    imgUploadSubmit.disabled = false;
  }
}

// функция проверки хэштега
function checkTextHashtag (text) {
  const hashtag = /^#[a-z\u0430-\u044F\u04510-9]{1,19}$/i;
  if (text === '') {
    return true;
  } else {
    return hashtag.test(text);
  }
}

// функция вывода ошибки хэштега
function errorTextHashtag (text) {

  if (!text.startsWith('#')) {
    return 'Хэштег должен начинаться c одного символа "#"!';
  } else if (text.lastIndexOf('#') !== 0) {
    return 'Хэштег должен содержать только один символ "#"!';
  } else if (text.length === hashtagLength.MIN - 1){
    return 'Хэштег должен содержать "#" и 1 символ!';
  } else if (text.length > hashtagLength.MAX){
    return 'Хэштег должен содержать не более 20 символов!';
  } else if (!(/^#[a-z\u0430-\u044F\u04510-9]{1,19}$/i).test(text)) {
    return 'Хэштег может содержать только буквы и цифры!';
  } else if (text.includes(' ')) {
    return 'Хэштег не может содержать пробелы!';
  }
}


// функция проверки комментария
function checkTextDescription (text) {
  return text.length <= descriptionLength;
}

// функция вывода ошибки комментария
function errorTextDescription () {
  return 'Максимальная длина комментария 140 символов!';
}

//
const checkingForm = (evt) => {

  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {
    console.log('Форма заполнена верно');
  } else {
    console.log('Форма заполнена неверно');
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
  if (evt.key === 'Escape') {
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


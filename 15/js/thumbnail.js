import { bigPictureOpen } from './picture.js';
import { getData } from './api.js';

const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const picturesContrainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();
const dataError = document.querySelector('#data-error').content.querySelector('.data-error');
const showTimeError = 5000;

// функция отрисовки ошибки
const downloadErrorOuput = () => {
  document.body.append(dataError);
  setTimeout(() => {
    dataError.remove();
  }, showTimeError);
};

// функция отрисовки карточки
const drawThumbnail = (photo) => {
  const element = templatePicture.cloneNode(true);
  const elementImage = element.querySelector('.picture__img');
  elementImage.src = photo.url;
  elementImage.alt = photo.description;
  element.querySelector('.picture__likes').textContent = photo.likes;
  element.querySelector('.picture__comments').textContent = photo.comments.length;
  element.addEventListener('click', (evt) => {
    evt.preventDefault();
    bigPictureOpen(photo);
  });
  return element;
};

// функция отриcовки карточек
const drawsThumbnails = (listPhotos) => {
  listPhotos.forEach((elementPhoto) => {
    fragment.append(drawThumbnail(elementPhoto));
  });
  picturesContrainer.append(fragment);
};

// функция отрисовки карточек
getData((data) => drawsThumbnails(data), () => downloadErrorOuput());


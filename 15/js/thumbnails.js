import { setDefault, setRandom, setDiscussed, sortDefault, sortRandom, sortDiscussed } from './thumbnails_filter.js';
import { bigPictureOpen } from './picture.js';
import { getData } from './api.js';

const imgFilters = document.querySelector('.img-filters');

const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
const picturesContrainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();
const dataError = document.querySelector('#data-error').content.querySelector('.data-error');
const showTimeError = 5000;

// функция отображения фильтров
const showFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
};


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


const clearThumbnails = () => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((element) => {
    element.remove();
  });
};

// функция отрисовки карточек
const getThumbnails = () => {
  getData(
    (data) => {
      showFilters();
      drawsThumbnails(data);
      setDefault(() => {
        clearThumbnails();
        drawsThumbnails(sortDefault(data));
      });
      setRandom(() => {
        clearThumbnails();
        drawsThumbnails(sortRandom(data));
      });
      setDiscussed(() => {
        clearThumbnails();
        drawsThumbnails(sortDiscussed(data));
      });
    },
    () => downloadErrorOuput());
};

getThumbnails();


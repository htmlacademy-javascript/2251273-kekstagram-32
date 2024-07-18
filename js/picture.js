import { drawsComments } from './comments.js';
import { getRandomInt } from './functions.js';
import { NUM_AVATARS } from './data.js';

const picture = document.querySelector('.big-picture');


// функция закрытия большой картинки
const bigPictureClose = () => {
  picture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};


// функция отслеживания нажатия Esc
const tracksEscKeystrokes = (evt) => {
  if (evt.key === 'Escape') {
    bigPictureClose();
    document.removeEventListener('keydown', tracksEscKeystrokes);
  }
};


// функция открытия большой картинки
const bigPictureOpen = (photo) => {
  const bigPicturePreview = picture.querySelector('.big-picture__preview');
  const pictureCloned = bigPicturePreview.cloneNode(true);
  const pictureClonedImg = pictureCloned.querySelector('.big-picture__img').querySelector('img');
  const socialPicture = pictureCloned.querySelector('.social__picture');
  const likesCount = pictureCloned.querySelector('.likes-count');
  const socialCaption = pictureCloned.querySelector('.social__caption');
  const pictureCancel = pictureCloned.querySelector('.big-picture__cancel');

  bigPicturePreview.remove();

  pictureClonedImg.src = photo.url;
  socialPicture.src = `img/avatar-${getRandomInt(NUM_AVATARS.MIN, NUM_AVATARS.MAX)}.svg`;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;

  drawsComments(pictureCloned, photo.comments);

  pictureCancel.addEventListener('click', () => {
    bigPictureClose();
    document.removeEventListener('keydown', tracksEscKeystrokes);
  });

  picture.append(pictureCloned);

  picture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', tracksEscKeystrokes);
};

export { bigPictureOpen };

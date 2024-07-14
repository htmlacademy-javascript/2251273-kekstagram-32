import { drawsComments } from './comments.js';
import { getRandomInt } from './functions.js';
import { NUM_AVATARS } from './data.js';

const picture = document.querySelector('.big-picture');
const pictureImg = picture.querySelector('.big-picture__img').querySelector('img');
const pictureCancel = picture.querySelector('.big-picture__cancel');
const likesCount = picture.querySelector('.likes-count');
const socialCaption = picture.querySelector('.social__caption');
const socialPicture = picture.querySelector('.social__picture');


// функция закрытия большой картинки
const bigPictureClose = () => {
  pictureCancel.addEventListener('click', () => {
    picture.classList.add('hidden');
    document.body.classList.remove('modal-open');
  }, { once: true });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      picture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
  });
};

// функция открытия большой картинки
const bigPictureOpen = (photo) => {
  socialPicture.src = `img/avatar-${getRandomInt(NUM_AVATARS.MIN, NUM_AVATARS.MAX)}.svg`;
  pictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;
  picture.classList.remove('hidden');
  bigPictureClose();
  drawsComments(photo.comments);
  document.body.classList.add('modal-open');
};

export { bigPictureOpen };

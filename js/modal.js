import { uploadClose } from './uploadform.js';

const submitError = document.querySelector('#error').content.querySelector('.error');
const submitSuccess = document.querySelector('#success').content.querySelector('.success');

//
const closeModal = (evt) => {
  const modal = document.querySelector('.modal');
  if (evt.key === 'Escape') {
    modal.remove();
  }
  modal.remove();
  document.removeEventListener('keydown', closeModal);
};


// функция вывода ошибки
const modalError = () => {
  const modal = submitError.cloneNode(true);
  const buttonError = modal.querySelector('.error__button');

  modal.classList.add('modal');

  buttonError.addEventListener('click', closeModal);
  document.addEventListener('keydown', closeModal);

  document.body.append(modal);
};

// функция отрисовки успешной загрузки картинки
const modalSucces = () => {
  const modal = submitSuccess.cloneNode(true);
  const buttonSuccess = modal.querySelector('.success__button');

  modal.classList.add('modal');

  buttonSuccess.addEventListener('click', closeModal);

  uploadClose();

  document.body.append(modal);
};

export { modalError, modalSucces };

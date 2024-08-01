import { uploadClose, tracksEscKeystrokes } from './uploadform.js';

const submitError = document.querySelector('#error').content.querySelector('.error');
const submitSuccess = document.querySelector('#success').content.querySelector('.success');

//
const closeModal = (evt) => {
  const modal = document.querySelector('.modal');
  const button = modal.querySelector('button');

  if (evt.key === 'Escape') {
    modal.remove();
    document.removeEventListener('keydown', closeModal);
    document.removeEventListener('click', closeModal);
  } else if (evt.target === modal || evt.target === button) {
    modal.remove();
    document.removeEventListener('click', closeModal);
    document.removeEventListener('keydown', closeModal);
  }
  // document.removeEventListener('keydown', closeModal);
  // document.removeEventListener('click', closeModal);
};


// функция вывода ошибки
const modalError = () => {
  const modal = submitError.cloneNode(true);

  modal.classList.add('modal');

  document.addEventListener('keydown', closeModal);
  document.addEventListener('click', closeModal);

  document.body.append(modal);
};

// функция отрисовки успешной загрузки картинки
const modalSucces = () => {
  const modal = submitSuccess.cloneNode(true);

  modal.classList.add('modal');

  document.addEventListener('keydown', closeModal);
  document.addEventListener('click', closeModal);

  uploadClose();
  document.removeEventListener('keydown', tracksEscKeystrokes);

  document.body.append(modal);
};

export { modalError, modalSucces };

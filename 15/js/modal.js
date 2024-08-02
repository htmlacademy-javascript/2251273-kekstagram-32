import { uploadClose, tracksEscKeystrokes } from './uploadform.js';

const submitError = document.querySelector('#error').content.querySelector('.error');
const submitSuccess = document.querySelector('#success').content.querySelector('.success');

// функция закрытия модального окна
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
};

// функция создания модального окна
const createModal = (popup) => {
  const modal = popup.cloneNode(true);

  modal.classList.add('modal');

  document.addEventListener('keydown', closeModal);
  document.addEventListener('click', closeModal);

  if (popup === submitSuccess) {
    uploadClose();
    document.removeEventListener('keydown', tracksEscKeystrokes);
  }

  document.body.append(modal);
};

// функции открытия модального окна
const modalError = () => createModal(submitError);
const modalSucces = () => createModal(submitSuccess);


export { modalError, modalSucces };


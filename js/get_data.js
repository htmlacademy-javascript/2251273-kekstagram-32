const showTimeError = 5000;

const apiUrl = 'https://32.javascript.htmlacademy.pro/kekstagram/data';

const dataError = document.querySelector('#data-error').content.querySelector('.data-error');


// функция отрисовки ошибки
const downloadErrorOuput = () => {
  document.body.append(dataError);
  setTimeout(() => {
    dataError.remove();
  }, showTimeError);
};

// функция получения данных
const getData = (onSuccess, onError) => fetch(apiUrl, {
  method: 'GET',
  credentials: 'same-origin'}
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((data) => {
    onSuccess(data);
  })
  .catch((error) => {
    onError(error);
  });

export { getData, downloadErrorOuput };

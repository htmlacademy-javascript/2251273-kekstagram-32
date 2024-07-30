const apiUrl = 'https://32.javascript.htmlacad emy.pro/kekstagram';

// функция отправки данных
const sendData = (onSuccess, onError, data) => fetch(apiUrl,
  {
    method: 'POST',
    body: data
  }
)
  .then((response) => {
    if (response.ok) {
      onSuccess();
      return response.json();
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  })
  .catch((error) => {
    onError(error);
  });


export { sendData };

const ApiUrl = {
  GET: 'https://32.javascript.htmlacademy.pro/kekstagram/data',
  POST: 'https://32.javascript.htmlacademy.pro/kekstagram/',
};


// функция запроса
const request = (onSuccess, onError, body, url, method) => {
  fetch(url, {
    method: method,
    credentials: 'same-origin',
    body: body,
  })
    .then((response) => {
      if (onSuccess) {
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
};

// функции запросов
const getData = (onSuccess, onError, body = null, url = ApiUrl.GET, method = 'GET') => request(onSuccess, onError, body ,url, method);
const sendData = (onSuccess, onError, body = null, url = ApiUrl.POST, method = 'POST') => request(onSuccess, onError, body, url, method);


export { getData, sendData };


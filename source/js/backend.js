'use strict';

(function () {
  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    var StatusCode = {
      OK: 200
    };
    var TIMEOUT_IN_MS = 10000;

    xhr.addEventListener('load', function () {
      xhr.status === StatusCode.OK ? onSuccess(xhr.response) : onError('Статус ответа: ' + xhr.status + xhr.statusText);
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  window.backend = {
    load: load
  }
})();

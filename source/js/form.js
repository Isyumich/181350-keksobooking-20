'use strict';

(function () {
  var ELEMENT_MAIN_WIDTH = 65;
  var ELEMENT_MAIN_HEIGHT = 65;

  // Функция заполнения поля Адрес
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mainLocationX = Number.parseInt(mapPinMain.style.left, 10);
  var mainLocationY = Number.parseInt(mapPinMain.style.top, 10);
  var mainAddress = document.querySelector('#address');

  var getAddress = function (isNotActive) {
    isNotActive ? mainAddress.value = Math.round(mainLocationX - ELEMENT_MAIN_WIDTH / 2) + ', ' + Math.round(mainLocationY - ELEMENT_MAIN_HEIGHT / 2)
      : mainAddress.value = Math.round(mainLocationX - ELEMENT_MAIN_WIDTH / 2) + ', ' + Math.round(mainLocationY - ELEMENT_MAIN_HEIGHT);
  };

  // БЛОКИРОВКА/РАЗБЛОКИРОВКА ПОЛЕЙ ВВОДА И КАРТЫ

  var inputAd = document.querySelectorAll('.ad-form__element');
  var inputMapFilters = document.querySelectorAll('.map__filter');
  var inputMapFeatures = document.querySelectorAll('.map__features');

  // Неактивный режим
  window.setFieldDisabled(inputAd, true);
  window.setFieldDisabled(inputMapFilters, true);
  window.setFieldDisabled(inputMapFeatures, true);
  getAddress(true);

  // Включение активного режима
  mapPinMain.addEventListener('mousedown', function (evt) {
    if (typeof evt === 'object') {
      if (evt.button === 0) {
        map.classList.remove('map--faded');
        window.setFieldDisabled(inputAd, false);
        window.setFieldDisabled(inputMapFilters, false);
        window.setFieldDisabled(inputMapFeatures, false);
        getAddress(false);
        window.renderAdElements();
      }
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      map.classList.remove('map--faded');
      window.setFieldDisabled(inputAd, false);
      window.setFieldDisabled(inputMapFilters, false);
      window.setFieldDisabled(inputMapFeatures, false);
      getAddress(false);
      window.renderAdElements();
    }
  });
})();

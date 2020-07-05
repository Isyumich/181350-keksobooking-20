'use strict';

(function () {
  // Функция заполнения поля Адрес
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mainAddress = document.querySelector('#address');

  // БЛОКИРОВКА/РАЗБЛОКИРОВКА ПОЛЕЙ ВВОДА И КАРТЫ

  var inputAd = document.querySelectorAll('.ad-form__element');
  var inputMapFilters = document.querySelectorAll('.map__filter');
  var inputMapFeatures = document.querySelectorAll('.map__features');

  // Неактивный режим
  window.util.setFieldDisabled(inputAd, true);
  window.util.setFieldDisabled(inputMapFilters, true);
  window.util.setFieldDisabled(inputMapFeatures, true);
  window.util.getAddress(true, mapPinMain, mainAddress);

  // Включение активного режима
  mapPinMain.addEventListener('mousedown', function (evt) {
    if (typeof evt === 'object') {
      if (evt.button === 0) {
        map.classList.remove('map--faded');
        window.util.setFieldDisabled(inputAd, false);
        window.util.setFieldDisabled(inputMapFilters, false);
        window.util.setFieldDisabled(inputMapFeatures, false);
        window.util.getAddress(false, mapPinMain, mainAddress);
        window.pin.renderAdElements();
      }
   }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      map.classList.remove('map--faded');
      window.util.setFieldDisabled(inputAd, false);
      window.util.setFieldDisabled(inputMapFilters, false);
      window.util.setFieldDisabled(inputMapFeatures, false);
      window.util.getAddress(false, mapPinMain, mainAddress);
      window.pin.renderAdElements();
    }
  });
})();

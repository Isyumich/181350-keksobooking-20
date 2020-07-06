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
  var onActiveMode = function () {
        map.classList.remove('map--faded');
        window.util.setFieldDisabled(inputAd, false);
        window.util.setFieldDisabled(inputMapFilters, false);
        window.util.setFieldDisabled(inputMapFeatures, false);
        window.util.getAddress(false, mapPinMain, mainAddress);
        window.pin.renderAdElements();
  };

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      newFunction();
    }
  });

    mapPinMain.addEventListener('mousedown', function (evt) {
    if (typeof evt === 'object') {
      if (evt.button === 0) {
        var startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        var dragged = false;

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();

          dragged = true;

          var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
          mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

          window.util.getAddress(false, mapPinMain, mainAddress);
        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();

          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
          if (!dragged) {
            onActiveMode();
          }
          window.util.getAddress(false, mapPinMain, mainAddress);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      }
    }
  });

})();

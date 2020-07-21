'use strict';

(function () {
  var ELEMENT_MAIN_WIDTH = 65;
  var ELEMENT_MAIN_HEIGHT = 65;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var ENTER_BUTTON = 'Enter';

  var getAddress = function (isNotActive, pin, address) {
    var mainLocationX = Number.parseInt(pin.style.left, 10);
    var mainLocationY = Number.parseInt(pin.style.top, 10);
    isNotActive ? address.value = Math.round(mainLocationX + ELEMENT_MAIN_WIDTH / 2) + ', ' + Math.round(mainLocationY + ELEMENT_MAIN_HEIGHT / 2)
      : address.value = Math.round(mainLocationX + ELEMENT_MAIN_WIDTH / 2) + ', ' + Math.round(mainLocationY + ELEMENT_MAIN_HEIGHT);
  };

  var getMoveLimit = function (isNotActive) {
    var body = document.querySelector('body');
    var fieldWidth = Number.parseInt(getComputedStyle(body).maxWidth, 10);
    var mainLocationX = Number.parseInt(mapPinMain.style.left, 10) + ELEMENT_MAIN_WIDTH / 2;
    var mainLocationY;

    if (isNotActive) {
      mainLocationY = Number.parseInt(mapPinMain.style.top, 10) + ELEMENT_MAIN_HEIGHT / 2;
    } else {
      mainLocationY = Number.parseInt(mapPinMain.style.top, 10) + ELEMENT_MAIN_HEIGHT;
    }

    if (mainLocationX < 0) {
      mapPinMain.style.left = 0 - ELEMENT_MAIN_WIDTH / 2 + 'px';
    }

    if (mainLocationX > fieldWidth) {
      mapPinMain.style.left = fieldWidth - ELEMENT_MAIN_WIDTH / 2 + 'px';
    }

    if (isNotActive) {
      if (mainLocationY < MIN_Y) {
        mapPinMain.style.top = MIN_Y - ELEMENT_MAIN_HEIGHT / 2 + 'px';
      }

      if (mainLocationY > MAX_Y) {
        mapPinMain.style.top = MAX_Y - ELEMENT_MAIN_HEIGHT / 2 + 'px';
      }

    } else {
      if (mainLocationY < MIN_Y) {
        mapPinMain.style.top = MIN_Y - ELEMENT_MAIN_HEIGHT + 'px';
      }
      if (mainLocationY > MAX_Y) {
        mapPinMain.style.top = MAX_Y - ELEMENT_MAIN_HEIGHT + 'px';
      }
    }
  };

  // Функция заполнения поля Адрес
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mainAddress = document.querySelector('#address');

  // БЛОКИРОВКА/РАЗБЛОКИРОВКА ПОЛЕЙ ВВОДА И КАРТЫ

  var adForm = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var inputAd = adForm.querySelectorAll('.ad-form__element');
  var inputMapFilters = filterForm.querySelectorAll('.map__filter');
  var inputMapFeatures = document.querySelectorAll('.map__features');


  // Неактивный режим
  window.util.setFieldDisabled(inputAd, true);
  window.util.setFieldDisabled(inputMapFilters, true);
  window.util.setFieldDisabled(inputMapFeatures, true);
  getAddress(true, mapPinMain, mainAddress);

  // Включение активного режима
  var onActiveMode = function () {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.util.setFieldDisabled(inputAd, false);
    window.util.setFieldDisabled(inputMapFeatures, false);
    getAddress(false, mapPinMain, mainAddress);
    window.pin.renderAdElements();
  };

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_BUTTON) {
      onActiveMode();
    }
  });

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (typeof evt === 'object') {
      if (evt.button === 0) {
        window.pin.deleteAdElements();

        var startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        var onMouseMove = function (moveEvt) {
          moveEvt.preventDefault();

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

          if (map.classList.contains('.map--faded')) {
            getMoveLimit(true);
            getAddress(true, mapPinMain, mainAddress);
          } else {
            getMoveLimit(false);
            getAddress(false, mapPinMain, mainAddress);
          }
        };

        var onMouseUp = function (upEvt) {
          upEvt.preventDefault();

          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
          onActiveMode();

          getAddress(false, mapPinMain, mainAddress);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      }
    }
  });

  window.toggle = {
    getAddress: getAddress
  };
})();

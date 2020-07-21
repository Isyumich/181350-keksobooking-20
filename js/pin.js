'use strict';

(function () {
  var ELEMENT_WIDTH = 50;
  var ELEMENT_HEIGHT = 70;
  var PINS_COUNT = 5;
  var ENTER_BUTTON = 'Enter';

  // Функция создания метки
  var pin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderRentAnnouncement = function (rentalAnnouncement) {
    var rentElement = pin.cloneNode(true);

    rentElement.querySelector('img').src = rentalAnnouncement.author.avatar;
    rentElement.querySelector('img').alt = rentalAnnouncement.offer.title;
    rentElement.style.left = rentalAnnouncement.location.x - ELEMENT_WIDTH / 2 + 'px';
    rentElement.style.top = rentalAnnouncement.location.y - ELEMENT_HEIGHT + 'px';

    return rentElement;
  };

  // Функция рендеринга элементов
  var mapPins = document.querySelector('.map__pins');

  var renderAdElements = function () {
    var successHandler = function (data) {
      var pins = data;
      var filterPins = window.filter.getFilterPins(pins);
      var indexFilterPins = window.filter.getIndexFilterPins(filterPins, pins);

      var pinsCount;
      var pinFragment = document.createDocumentFragment();
      filterPins.length > PINS_COUNT ? pinsCount = PINS_COUNT : pinsCount = filterPins.length;

      for (var j = 0; j < pinsCount; j++) {
        pinFragment.appendChild(renderRentAnnouncement(filterPins[j]));
      }

      mapPins.appendChild(pinFragment);

      var mapPinElements = document.querySelectorAll('.map__pin');

      mapPinElements.forEach(function (item, i, mapPinElements) {
        if (i > 0) {
          var elementNumber = i - 1;
          mapPinElements[i].addEventListener('click', window.card.adCardHandler(mapPinElements[i], pins[indexFilterPins[elementNumber]]));

          mapPinElements[i].addEventListener('keydown', function (evt) {
            if (evt.key === ENTER_BUTTON) {
              window.card.adCardHandler(mapPinElements[i], pins[indexFilterPins[elementNumber]]);
            }
          });
        }
      })

      var inputMapFilters = document.querySelectorAll('.map__filter');
      window.util.setFieldDisabled(inputMapFilters, false);
    };


    var errorHandler = function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    };

    window.backend.load(successHandler, errorHandler);
  };

  var deleteAdElements = function () {
    var mapPinElements = mapPins.querySelectorAll('.map__pin');
    var mapPinMain = mapPins.querySelector('.map__pin--main');
    for (var i = 0; i < mapPinElements.length; i++) {
      if (mapPinElements[i] !== mapPinMain) {
        mapPins.removeChild(mapPinElements[i]);
      }
    }
    ;
  };
  window.pin = {
    renderAdElements: renderAdElements,
    deleteAdElements: deleteAdElements
  }
})();

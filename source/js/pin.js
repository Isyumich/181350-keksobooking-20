'use strict';

(function () {
  var ELEMENT_WIDTH = 50;
  var ELEMENT_HEIGHT = 70;

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
  var map = document.querySelector('.map');

  var renderAdElements = function () {
    var successHandler = function (pins) {
      var pinFragment = document.createDocumentFragment();
      for (var j = 0; j < pins.length; j++) {
        pinFragment.appendChild(renderRentAnnouncement(pins[j]));
      }

      mapPins.appendChild(pinFragment);

      var mapPinElements = document.querySelectorAll('.map__pin');

      for (var l = 1; l < mapPinElements.length; l++) {
        mapPinElements[l].addEventListener('click', window.card.adCardHandler(mapPinElements[l], pins[l-1]));

        mapPinElements[l].addEventListener('keydown', function (evt) {
          if (evt.key === 'Enter') {
            window.card.adCardHandler(mapPinElements[l], pins[l-1]);
          }
        });
      };
      // document.addEventListener('keydown', closeCard);
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
    };
  };
  window.pin = {
    renderAdElements: renderAdElements,
    deleteAdElements: deleteAdElements
  }
})();

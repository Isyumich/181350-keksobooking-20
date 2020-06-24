'use strict';

(function () {
  var ELEMENT_WIDTH = 50;
  var ELEMENT_HEIGHT = 70;

// Функция создания DOM элемента
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
    var successHandler = function (pins) {
      var fragment = document.createDocumentFragment();
      for (var j = 0; j < pins.length; j++) {
        fragment.appendChild(renderRentAnnouncement(pins[j]));
      }

      mapPins.appendChild(fragment);
    }

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
  window.pin = {
    renderAdElements: renderAdElements
  }
})();

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
    var rentalAnnouncementArray = window.data.getRentalAnnouncementArray();
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < rentalAnnouncementArray.length; j++) {
      fragment.appendChild(renderRentAnnouncement(rentalAnnouncementArray[j]));
    }

    mapPins.appendChild(fragment);
  };
  window.pin = {
    renderAdElements: renderAdElements
  }
})();

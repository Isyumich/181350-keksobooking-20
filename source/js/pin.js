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

// Функция создания карточки с описанием
  var card = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  var renderRentDescription = function (rentalDescription) {
    var cardElement = card.cloneNode(true);
    var popupPhotos = card.querySelector('.popup__photos');
    var popupFeatures = card.querySelector('.popup__features');
    var features = rentalDescription.offer.features;
    var photos = rentalDescription.offer.photos;

    cardElement.querySelector('.popup__avatar').src = rentalDescription.author.avatar;
    cardElement.querySelector('.popup__title').textContent = rentalDescription.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = rentalDescription.offer.address
    cardElement.querySelector('.popup__text--price').textContent = rentalDescription.offer.price + '₽/ночь';

    switch (rentalDescription.offer.type) {
      case 'flat':
        cardElement.querySelector('.popup__type').textContent = 'Квартира';
        break;
      case 'bungalo':
        cardElement.querySelector('.popup__type').textContent = 'Бунгало';
        break;
      case 'house':
        cardElement.querySelector('.popup__type').textContent = 'Дом';
        break;
      case 'palace':
        cardElement.querySelector('.popup__type').textContent = 'Дворец';
        break;
      default:
        cardElement.querySelector('.popup__type').textContent = 'Жилье';
    }

    cardElement.querySelector('.popup__text--capacity').textContent = rentalDescription.offer.rooms + ' комнаты для ' + rentalDescription.offer.rooms + 'гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' +  rentalDescription.offer.checkin + ', выезд до ' + rentalDescription.offer.checkout;

    while (popupFeatures.firstChild) {
      popupFeatures.removeChild(popupFeatures.firstChild);
    }

    for (var i = 0; i < features.length; i++) {
      var li = document.createElement('li');

      li.className = 'popup__feature popup__feature--' + features[i];

      popupFeatures.appendChild(li);
    };

    cardElement.querySelector('.popup__description').textContent = rentalDescription.offer.description;

    while (popupPhotos.firstChild) {
      popupPhotos.removeChild(popupPhotos.firstChild);
    }

    for (var k = 0; k < photos.length; k++) {
      var img = document.createElement('img');
      img.src = photos[k];
      img.className = 'popup__photo';
      img.width = 45;
      img.width = 40;
      img.alt = 'Фотография жилья';
      popupPhotos.appendChild(img);
    };
    cardElement.classList.add('visually-hidden');

    return cardElement;

  };

// Функция показа элемента
  var adCardHandler = function (collection, i) {
    return function (){
      for (var collectionElement of collection) {
        if (!collectionElement.classList.contains('visuallyhidden')) {
          collectionElement.classList.add('visually-hidden');
        }
      }
      collection[i].classList.remove('visually-hidden');
    }
  };

// Функция скрытия элемента
  var hiddenCardHandler = function (collection, i) {
    return function (){
      collection[i].classList.add('visually-hidden');
    }
  };

// Функция рендеринга элементов
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');

  var renderAdElements = function () {
    var successHandler = function (pins) {
      var pinFragment = document.createDocumentFragment();
      var cardFragment = document.createDocumentFragment();
      for (var j = 0; j < pins.length; j++) {
        pinFragment.appendChild(renderRentAnnouncement(pins[j]));
        cardFragment.appendChild(renderRentDescription(pins[j]));
      }

      mapPins.appendChild(pinFragment);
      map.appendChild(cardFragment);

      var mapCardElements = document.querySelectorAll('.map__card');
      var mapPinElements = document.querySelectorAll('.map__pin');
      var closeCardButtons = document.querySelectorAll('.popup__close');

      for (var l = 1; l < mapPinElements.length; l++) {
        mapPinElements[l].addEventListener('click', adCardHandler(mapCardElements, l-1));

        closeCardButtons[l-1].addEventListener('click', hiddenCardHandler(mapCardElements, l-1));

        mapPinElements[l].addEventListener('keydown', function (evt) {
          if (evt.key === 'Enter') {
            evt.preventDefault();
            adCardHandler(mapCardElements, l-1);
          }
        });

        document.addEventListener('keydown', function (evt) {
          if (evt.key === 'Escape') {
            evt.preventDefault();
            for (var mapCardElement of mapCardElements) {
              if (!mapCardElement.classList.contains('visually-hidden')) {
                mapCardElement.classList.add('visually-hidden');
              }
            }
          }
        });
  };
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
  window.pin = {
    renderAdElements: renderAdElements
  }
})();

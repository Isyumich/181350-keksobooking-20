'use strict';

(function () {
  var IMAGE_WIDTH = 45;
  var IMAGE_HEIGHT = 40;
  var IMAGE_DESCRIPTION = 'Фотография жилья';

  var ESCAPE_BUTTON = 'Escape';

  var TypeOfHousing = {
    BUNGALO: 'bungalo',
    FLAT: 'flat',
    HOUSE: 'house',
    PALACE: 'palace'
  };

  var TranscriptTypeOfHousing = {
    BUNGALO: 'Бунгало',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    PALACE: 'Дворец',
    DEFAULT: 'Жилье'
  };
  // Функция создания карточки с описанием
  var card = document.querySelector('#card')
    .content
    .querySelector('.map__card');
  var map = document.querySelector('.map');

  var renderRentDescription = function (rentalDescription) {
    var cardElement = card.cloneNode(true);
    var popupPhotos = cardElement.querySelector('.popup__photos');
    var popupFeatures = cardElement.querySelector('.popup__features');

    var features = rentalDescription.offer.features;
    var photos = rentalDescription.offer.photos;

    cardElement.querySelector('.popup__avatar').src = rentalDescription.author.avatar;
    cardElement.querySelector('.popup__title').textContent = rentalDescription.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = rentalDescription.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = rentalDescription.offer.price + '₽/ночь';

    switch (rentalDescription.offer.type) {
      case TypeOfHousing.FLAT:
        cardElement.querySelector('.popup__type').textContent = TranscriptTypeOfHousing.FLAT;
        break;
      case TypeOfHousing.BUNGALO:
        cardElement.querySelector('.popup__type').textContent = TranscriptTypeOfHousing.BUNGALO;
        break;
      case TypeOfHousing.HOUSE:
        cardElement.querySelector('.popup__type').textContent = TranscriptTypeOfHousing.HOUSE;
        break;
      case TypeOfHousing.PALACE:
        cardElement.querySelector('.popup__type').textContent = TranscriptTypeOfHousing.PALACE;
        break;
      default:
        cardElement.querySelector('.popup__type').textContent = TranscriptTypeOfHousing.DEFAULT;
    }

    cardElement.querySelector('.popup__text--capacity').textContent = rentalDescription.offer.rooms + ' комнаты для ' + rentalDescription.offer.guests + 'гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + rentalDescription.offer.checkin + ', выезд до ' + rentalDescription.offer.checkout;

    while (popupPhotos.firstChild) {
      popupPhotos.removeChild(popupPhotos.firstChild);
    }
    photos.forEach(function (item) {
      var img = document.createElement('img');
      img.src = item;
      img.className = 'popup__photo';
      img.width = IMAGE_WIDTH;
      img.height = IMAGE_HEIGHT;
      img.alt = IMAGE_DESCRIPTION;
      popupPhotos.appendChild(img);
    });

    while (popupFeatures.firstChild) {
      popupFeatures.removeChild(popupFeatures.firstChild);
    }

    features.forEach(function (item) {
      var li = document.createElement('li');

      li.className = 'popup__feature popup__feature--' + item;

      popupFeatures.appendChild(li);
    });

    cardElement.querySelector('.popup__description').textContent = rentalDescription.offer.description;

    return cardElement;
  };

  // Функция показа карточки
  var adCardHandler = function (mapElement, cardElement) {
    return function () {
      var mapCard = document.querySelector('.map__card');
      if (mapCard !== null) {
        map.removeChild(mapCard);
      }

      map.appendChild(renderRentDescription(cardElement));

      var closeCardButton = document.querySelector('.popup__close');

      closeCardButton.addEventListener('click', hiddenCardHandler(map));
      document.addEventListener('keydown', hiddenCardHandlerEscape);
    };
  };

  // Функция закрытия карточки
  var hiddenCardHandler = function (element) {
    return function () {
      var cardElement = document.querySelector('.map__card');
      if (cardElement) {
        element.removeChild(cardElement);
      }
    };
  };

  var hiddenCardHandlerEscape = function (evt) {
    if (evt.key === ESCAPE_BUTTON) {
      var cardElement = document.querySelector('.map__card');
      if (cardElement) {
        map.removeChild(cardElement);
      }
      document.removeEventListener('keydown', hiddenCardHandlerEscape);
    }
  };

  window.card = {
    adCardHandler: adCardHandler,
    hiddenCardHandler: hiddenCardHandler
  };
})();

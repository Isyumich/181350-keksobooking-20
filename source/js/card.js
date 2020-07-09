'use strict';

(function () {
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

    while (popupFeatures.firstChild) {
      popupFeatures.removeChild(popupFeatures.firstChild);
    }

    for (var i = 0; i < features.length; i++) {
      var li = document.createElement('li');

      li.className = 'popup__feature popup__feature--' + features[i];

      popupFeatures.appendChild(li);
    };

    cardElement.querySelector('.popup__description').textContent = rentalDescription.offer.description;

    return cardElement;
  };

  // Функция показа карточки
    var adCardHandler = function (mapElement, cardElement) {
      return function (){
        var mapCard = document.querySelector('.map__card');
        if(mapCard !== null) {
          map.removeChild(mapCard);
        }

        map.appendChild(renderRentDescription(cardElement));

        var closeCardButton = document.querySelector('.popup__close');

        closeCardButton.addEventListener('click', hiddenCardHandler(map));
      }
    };
  // Функция закрытия карточки
    var hiddenCardHandler = function (element) {
      return function (){
        var cardElement = document.querySelector('.map__card');
        element.removeChild(cardElement);
      }
    };

      window.card = {
        adCardHandler: adCardHandler
      }
})();

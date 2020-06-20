'use strict';

(function () {
  var TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN = ['12:00', '13:00', '14:00'];
  var CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var ROOMS = ['1 комната', '2 комнаты', '3 комнаты', '100 комнат'];
  var GUESTS = ['для 1 гостя', 'для 2 гостей', 'для 3 гостей', 'не для гостей'];
  var MIN_PRICE = 1;
  var MAX_PRICE = 1000000;
  var COUNT_RENTAL_ANNOUNCEMENT = 8;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var MIN_X = 1;

  // Создание одного объекта
  var fieldWidth = document.body.clientWidth;

  var getRentalAnnouncement = function (avatarNumber) {
    var locationX = window.util.getRandomNumber(MIN_X, fieldWidth);
    var locationY = window.util.getRandomNumber(MIN_Y, MAX_Y);

    return {
      'author': {
        'avatar': 'img/avatars/user0' + avatarNumber + '.png',
      },
      'offer': {
        'title': 'Заголовок предложения',
        'address': locationX + ', ' + locationY,
        'price': window.util.getRandomNumber(MIN_PRICE, MAX_PRICE),
        'type': window.util.getRandomArrayElement(TYPE),
        'rooms': window.util.getRandomArrayElement(ROOMS),
        'guests': window.util.getRandomArrayElement(GUESTS),
        'checkin': window.util.getRandomArrayElement(CHECKIN),
        'checkout': window.util.getRandomArrayElement(CHECKOUT),
        'features': window.util.getRandomArray(FEATURES),
        'description': 'Строка с описанием',
        'photos': window.util.getRandomArray(PHOTOS),
      },
      'location': {
        'x': locationX,
        'y': locationY,
      },
    };
  };

// Создание массива объектов
  var getRentalAnnouncementArray = function () {
    var rentalAnnouncementArray = [];
    for (var i = 0; i < COUNT_RENTAL_ANNOUNCEMENT; i++) {
      rentalAnnouncementArray.push(getRentalAnnouncement(i + 1));
    }
    return rentalAnnouncementArray;
  }
  window.data = {
    getRentalAnnouncementArray: getRentalAnnouncementArray
  }
})();

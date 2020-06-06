'use strict';

var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_PRICE = 1;
var MAX_PRICE = 5000;
var MIN_COUNT_ROOMS = 1;
var MAX_COUNT_ROOMS = 5;
var MIN_COUNT_GUESTS = 1;
var MAX_COUNT_GUESTS = 10;
var COUNT_RENTAL_ANNOUNCEMENT = 8;
var MIN_Y = 130;
var MAX_Y = 630;
var MIN_X = 1;
var ELEMENT_WIDTH = 50;
var ELEMENT_HEIGHT = 70;

// Функция создания случайного числа
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// Функция получения случайного элемента массива
var getRandomArrayElement = function (sourceArray) {
  return getRandomNumber(0, sourceArray.length - 1);
};

// Создание случайного массива
var getRandomArray = function (sourceArray) {
  var randomArray = [];
  while (randomArray.length <= getRandomNumber(1, sourceArray.length)) {
    var randomNumber = getRandomArrayElement(sourceArray);
    if (randomArray.lenght === 0) {
      randomArray.push(sourceArray[randomNumber]);
    } else if (randomArray.indexOf(sourceArray[randomNumber]) === -1) {
      randomArray.push(sourceArray[randomNumber]);
    }
  }
  return randomArray;
};

// Покажем карту
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var fieldWidth = document.body.clientWidth;


// Создание одного объекта
var getRentalAnnouncement = function (avatarNumber) {
  var rentalAnnouncement = {
    'author': {
      'avatar': 'img/avatars/user0' + avatarNumber + '.png'
    },
    'offer': {
      'title': 'Заголовок предложения',
      'address': '600, 350',
      'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
      'type': TYPE[getRandomArrayElement(TYPE)],
      'rooms': getRandomNumber(MIN_COUNT_ROOMS, MAX_COUNT_ROOMS),
      'guests': getRandomNumber(MIN_COUNT_GUESTS, MAX_COUNT_GUESTS),
      'checkin': CHECKIN[getRandomArrayElement(CHECKIN)],
      'checkout': CHECKOUT[getRandomArrayElement(CHECKOUT)],
      'features': getRandomArray(FEATURES),
      'description': 'Строка с описанием',
      'photos': getRandomArray(PHOTOS)
    },
    'location': {
      'x': getRandomNumber(MIN_X, fieldWidth),
      'y': getRandomNumber(MIN_Y, MAX_Y)
    }
  };
  return rentalAnnouncement;
};

// Создание массива объектов
var rentalAnnouncementArray = [];
for (var i = 0; i < COUNT_RENTAL_ANNOUNCEMENT; i++) {
  rentalAnnouncementArray[i] = getRentalAnnouncement(i + 1);
}

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

// Рендеринг элементов
var mapPins = document.querySelector('.map__pins');

var fragment = document.createDocumentFragment();
for (var j = 0; j < rentalAnnouncementArray.length; j++) {
  fragment.appendChild(renderRentAnnouncement(rentalAnnouncementArray[j]));
}

mapPins.appendChild(fragment);

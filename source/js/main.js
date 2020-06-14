'use strict';

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
var ELEMENT_WIDTH = 50;
var ELEMENT_HEIGHT = 70;
var ELEMENT_MAIN_WIDTH = 65;
var ELEMENT_MAIN_HEIGHT = 65;
// Функция создания случайного числа
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// Функция получения случайного элемента массива
var getRandomArrayElement = function (sourceArray) {
  return sourceArray[getRandomNumber(0, sourceArray.length - 1)];
};

// Создание случайного массива
var getRandomArray = function (sourceArray) {
  var randomArray = [];
  var randomArrayLength = getRandomNumber(1, sourceArray.length);
  while (randomArray.length < randomArrayLength) {
    var randomElement = getRandomArrayElement(sourceArray);
    if (randomArray.indexOf(randomElement) === -1) {
      randomArray.push(randomElement);
    }
  }
  return randomArray;
};

//Функция блокировки/разблокировки
var setFieldDisabled = function (inputFields, isDisabled) {
  for (var n = 0; n < inputFields.length; n++) {
    inputFields[n].disabled = isDisabled;
  }
};

// Создание одного объекта
var fieldWidth = document.body.clientWidth;

var getRentalAnnouncement = function (avatarNumber) {
  var locationX = getRandomNumber(MIN_X, fieldWidth);
  var locationY = getRandomNumber(MIN_Y, MAX_Y);

  return {
    'author': {
      'avatar': 'img/avatars/user0' + avatarNumber + '.png',
    },
    'offer': {
      'title': 'Заголовок предложения',
      'address': locationX + ', ' + locationY,
      'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
      'type': getRandomArrayElement(TYPE),
      'rooms': getRandomArrayElement(ROOMS),
      'guests': getRandomArrayElement(GUESTS),
      'checkin': getRandomArrayElement(CHECKIN),
      'checkout': getRandomArrayElement(CHECKOUT),
      'features': getRandomArray(FEATURES),
      'description': 'Строка с описанием',
      'photos': getRandomArray(PHOTOS),
    },
    'location': {
      'x': locationX,
      'y': locationY,
    },
  };
};

// Создание массива объектов
var rentalAnnouncementArray = [];
for (var i = 0; i < COUNT_RENTAL_ANNOUNCEMENT; i++) {
  rentalAnnouncementArray.push(getRentalAnnouncement(i + 1));
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

// Функция рендеринга элементов
var mapPins = document.querySelector('.map__pins');

var renderAdElements = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < rentalAnnouncementArray.length; j++) {
    fragment.appendChild(renderRentAnnouncement(rentalAnnouncementArray[j]));
  }

  mapPins.appendChild(fragment);
};

// Функция заполнения поля Адрес
var map = document.querySelector('.map');
var mapPinMain = map.querySelector('.map__pin--main');
var mainLocationX = Number.parseInt(mapPinMain.style.left, 10);
var mainLocationY = Number.parseInt(mapPinMain.style.top, 10);
var mainAddress = document.querySelector('#address');

var getAddress = function (isNotActive) {
  isNotActive ? mainAddress.value = Math.round(mainLocationX - ELEMENT_MAIN_WIDTH / 2) + ', ' + Math.round(mainLocationY - ELEMENT_MAIN_HEIGHT / 2)
    : mainAddress.value = Math.round(mainLocationX - ELEMENT_MAIN_WIDTH / 2) + ', ' + Math.round(mainLocationY - ELEMENT_MAIN_HEIGHT);
};

// БЛОКИРОВКА/РАЗБЛОКИРОВКА ПОЛЕЙ ВВОДА И КАРТЫ

var inputAd = document.querySelectorAll('.ad-form__element');
var inputMapFilters = document.querySelectorAll('.map__filter');
var inputMapFeatures = document.querySelectorAll('.map__features');

// Неактивный режим
setFieldDisabled(inputAd, true);
setFieldDisabled(inputMapFilters, true);
setFieldDisabled(inputMapFeatures, true);
getAddress(true);

// Включение активного режима
mapPinMain.addEventListener('mousedown', function (evt) {
  if (typeof evt === 'object') {
    if (evt.button === 0) {
      map.classList.remove('map--faded');
      setFieldDisabled(inputAd, false);
      setFieldDisabled(inputMapFilters, false);
      setFieldDisabled(inputMapFeatures, false);
      getAddress(false);
      renderAdElements();
    }
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    map.classList.remove('map--faded');
    setFieldDisabled(inputAd, false);
    setFieldDisabled(inputMapFilters, false);
    setFieldDisabled(inputMapFeatures, false);
    getAddress(false);
    renderAdElements();
  }
});

// ВАЛИДАЦИЯ ФОРМЫ
var capacity = document.querySelector('#capacity');
var roomNumber = document.querySelector('#room_number');

capacity.addEventListener('change', function () {
    if (roomNumber.value === '100') {
      console.log('success');
      if (capacity.value !== '0') {
        console.log('success');
        capacity.setCustomValidity('Сто комнат не для гостей');
      } else {capacity.setCustomValidity('');
      }
    } else if (roomNumber.value < capacity.value) {
      capacity.setCustomValidity('Количество гостей не может превышать количество комнат');
    } else {
      capacity.setCustomValidity('')
    }
  });



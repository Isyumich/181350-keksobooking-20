'use strict';

(function () {
  var BUNGALO_MIN_PRICE = 0;
  var FLAT_MIN_PRICE = 1000;
  var HOUSE_MIN_PRICE = 5000;
  var PALACE_MIN_PRICE = 10000;
  var ROOM_MAX_VALUE = '100';
  var CAPACITY_NO_GUESTS_VALUE = '0';

  var form = document.querySelector('.ad-form');
  var capacity = form.querySelector('#capacity');
  var typeField = form.querySelector('#type');
  var roomNumber = form.querySelector('#room_number');
  var priceField = form.querySelector('#price');

  var setValidCapacity = function () {
    if (roomNumber.value === ROOM_MAX_VALUE) {
      if (capacity.value !== CAPACITY_NO_GUESTS_VALUE) {
        capacity.setCustomValidity('Сто комнат не для гостей');
      } else {
        capacity.setCustomValidity('');
      }
    } else {
      if (capacity.value === CAPACITY_NO_GUESTS_VALUE) {
        capacity.setCustomValidity('Значение "не для гостей" может быть выбрано только для 100 комнат');
      } else if (roomNumber.value < capacity.value) {
        capacity.setCustomValidity('Количество гостей не может превышать количество комнат');
      } else {
        capacity.setCustomValidity('');
      }
    }
  };

  var setValidTypeField = function () {
    switch (typeField.value) {
      case 'bungalo':
        priceField.min = BUNGALO_MIN_PRICE;
        priceField.placeholder = priceField.min;
        break;
      case 'flat':
        priceField.min = FLAT_MIN_PRICE;
        priceField.placeholder = priceField.min;
        break;
      case 'house':
        priceField.min = HOUSE_MIN_PRICE;
        priceField.placeholder = priceField.min;
        break;
      case 'palace':
        priceField.min = PALACE_MIN_PRICE;
        priceField.placeholder = priceField.min;
        break;
    }
  };

  capacity.addEventListener('change', setValidCapacity);
  roomNumber.addEventListener('change', setValidCapacity);
  typeField.addEventListener('change', setValidTypeField);

  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

})();

'use strict';

(function () {
  var form = document.querySelector('.ad-form');

  var capacity = form.querySelector('#capacity');
  var roomNumber = form.querySelector('#room_number');

  capacity.addEventListener('change', function () {
    if (roomNumber.value === '100') {
      if (capacity.value !== '0') {
        capacity.setCustomValidity('Сто комнат не для гостей');
      } else {
        capacity.setCustomValidity('');
      }
    } else if (roomNumber.value < capacity.value) {
      capacity.setCustomValidity('Количество гостей не может превышать количество комнат');
    } else {
      capacity.setCustomValidity('');
    }
  });

  var priceField = form.querySelector('#price');
  var typeField = form.querySelector('#type');

  typeField.addEventListener('change', function () {
    switch (typeField.value) {
      case 'bungalo':
        priceField.min = 0;
        priceField.placeholder = priceField.min;
        break;
      case 'flat':
        priceField.min = 1000;
        priceField.placeholder = priceField.min;
        break;
      case 'house':
        priceField.min = 5000;
        priceField.placeholder = priceField.min;
      break;
      case 'palace':
        priceField.min = 10000;
        priceField.placeholder = priceField.min;
      break;
    }
  });

  var timeIn = form.querySelector('#timein');
  var timeOut = form.querySelector('#timeout');

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });
})();

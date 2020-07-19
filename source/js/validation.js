'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var capacity = form.querySelector('#capacity');
  var typeField = form.querySelector('#type');
  var roomNumber = form.querySelector('#room_number');
  var priceField = form.querySelector('#price');

  var setValidCapacity = function () {
      if (roomNumber.value === '100') {
        if (capacity.value !== '0') {
          capacity.setCustomValidity('Сто комнат не для гостей');
        } else {
          capacity.setCustomValidity('');
        }
      } else {
        if (capacity.value === '0') {
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

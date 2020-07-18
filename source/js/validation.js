'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var capacity = form.querySelector('#capacity');
  var typeField = form.querySelector('#type');
  var roomNumber = form.querySelector('#room_number');

  var setValidCapacity = function () {
    var capacity = form.querySelector('#capacity');
    var roomNumber = form.querySelector('#room_number');
      if (roomNumber.value === '100') {
        console.log(1);
        if (capacity.value !== '0') {
          console.log(2);
          capacity.setCustomValidity('Сто комнат не для гостей');
        } else {
          console.log(3);
          capacity.setCustomValidity('');
        }
      } else if (roomNumber.value < capacity.value) {
        console.log(4);
        capacity.setCustomValidity('Количество гостей не может превышать количество комнат');
      } else {
        console.log(5);
        capacity.setCustomValidity('');
    }
  };

  var setValidTypeField = function () {
    return function () {
      var priceField = form.querySelector('#price');
      var typeField = form.querySelector('#type');

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

  window.validation = {
    setValidCapacity: setValidCapacity,
    setValidTypeField: setValidTypeField
  }
})();

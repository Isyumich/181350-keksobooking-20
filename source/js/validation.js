'use strict';

(function () {
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');

  capacity.addEventListener('change', function () {
    if (roomNumber.value === '100') {
      console.log('success');
      if (capacity.value !== '0') {
        console.log('success');
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
})();

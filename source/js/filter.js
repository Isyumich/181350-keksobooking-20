'use strict';
(function () {
  var getFilterPins = function (array) {
    var filterForm = document.querySelector('.map__filters');
    var housingType = filterForm.querySelector('#housing-type');
    var housingPrice = filterForm.querySelector('#housing-price');
    var housingRooms = filterForm.querySelector('#housing-rooms');
    var housingGuests = filterForm.querySelector('#housing-guests');
    var features = filterForm.querySelectorAll('[type="checkbox"]:checked');
    var filterPins = [];
    for (var i = 0; i < array.length; i++) {
      var pin = array[i];
      if (
        (housingType.value === 'any' || pin.offer.type === housingType.value)
        &&
        (housingPrice.value === 'any'
          || (housingPrice.value === 'low' && pin.offer.price < 10000)
          || (housingPrice.value === 'middle' && (pin.offer.price >= 10000 && pin.offer.price < 50000))
          || (housingPrice.value === 'high' && pin.offer.price >= 50000)
        )
        &&
        (housingRooms.value === 'any' || pin.offer.rooms === Number.parseInt(housingRooms.value))
        &&
        (housingGuests.value === 'any' || pin.offer.guests === Number.parseInt(housingGuests.value))

      ) {
        if (features.length === 0) {
          filterPins.push(pin);
        } else {
          var counter = 0;
          for (var feature of features) {
            if (pin.offer.features.indexOf(feature.value) !== -1) {
              counter ++;
            }
          }
          if (counter === features.length) {
            filterPins.push(pin);
          }
        }

      }
    }
    ;

    return filterPins;
  };

  var getIndexFilterPins = function (filterArray, array) {
    var IndexFilterPins = [];
    for (var element of filterArray) {
      var index = array.indexOf(element);
      IndexFilterPins.push(index);
    }
    ;
    return IndexFilterPins;
  };

  window.filter = {
    getFilterPins: getFilterPins,
    getIndexFilterPins: getIndexFilterPins,
  };
})();

'use strict';
(function () {
  var LOW_HOUSING_PRICE = 'low';
  var MIDDLE_HOUSING_PRICE = 'middle';
  var HIGH_HOUSING_PRICE = 'high';
  var ANY_VALUE = 'any';

  var getFilterPins = function (array) {
    var filterForm = document.querySelector('.map__filters');
    var housingType = filterForm.querySelector('#housing-type');
    var housingPrice = filterForm.querySelector('#housing-price');
    var housingRooms = filterForm.querySelector('#housing-rooms');
    var housingGuests = filterForm.querySelector('#housing-guests');
    var features = filterForm.querySelectorAll('[type="checkbox"]:checked');
    var filterPins = [];

    array.forEach(function (item) {
      var pin = item;
      if (
        (housingType.value === ANY_VALUE || pin.offer.type === housingType.value)
        &&
        (housingPrice.value === ANY_VALUE
          || (housingPrice.value === LOW_HOUSING_PRICE && pin.offer.price < 10000)
          || (housingPrice.value === MIDDLE_HOUSING_PRICE && (pin.offer.price >= 10000 && pin.offer.price < 50000))
          || (housingPrice.value === HIGH_HOUSING_PRICE && pin.offer.price >= 50000)
        )
        &&
        (housingRooms.value === ANY_VALUE || pin.offer.rooms === Number.parseInt(housingRooms.value))
        &&
        (housingGuests.value === ANY_VALUE || pin.offer.guests === Number.parseInt(housingGuests.value))

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
    });

    return filterPins;
  };

  var getIndexFilterPins = function (filterArray, array) {
    var indexFilterPins = [];
    for (var element of filterArray) {
      var index = array.indexOf(element);
      indexFilterPins.push(index);
    }
    ;
    return indexFilterPins;
  };

  window.filter = {
    getFilterPins: getFilterPins,
    getIndexFilterPins: getIndexFilterPins,
  };
})();

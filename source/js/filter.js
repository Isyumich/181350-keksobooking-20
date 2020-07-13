'use strict';
(function () {
  var getFilterPins = function (array) {
    var filterForm = document.querySelector('.map__filters');
    var housingType = filterForm.querySelector('#housing-type');

    var filterPins = [];
    if (housingType.value === 'any') {
      filterPins = array;
    } else {
      for (var pin of array) {
        if (pin.offer.type === housingType.value) {
          filterPins.push(pin);
        }
      }
    };

    return filterPins;
  };

  var getIndexFilterPins = function (array) {
    var IndexFilterPins = [];
    var filterPins = getFilterPins(array);
    for (var element of filterPins) {
      var index = array.indexOf(element);
      IndexFilterPins.push(index);
    };
    return IndexFilterPins;
  };

  window.filter = {
    getFilterPins: getFilterPins,
    getIndexFilterPins: getIndexFilterPins
  };
})();

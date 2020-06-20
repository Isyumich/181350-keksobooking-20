'use strict';

(function () {
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

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomArrayElement: getRandomArrayElement,
    getRandomArray: getRandomArray,
    setFieldDisabled: setFieldDisabled
  }
})();

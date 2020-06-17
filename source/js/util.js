'use strict';

(function () {
  // Функция создания случайного числа
  window.getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  // Функция получения случайного элемента массива
  window.getRandomArrayElement = function (sourceArray) {
    return sourceArray[getRandomNumber(0, sourceArray.length - 1)];
  };

  // Создание случайного массива
  window.getRandomArray = function (sourceArray) {
    var randomArray = [];
    var randomArrayLength = window.getRandomNumber(1, sourceArray.length);
    while (randomArray.length < randomArrayLength) {
      var randomElement = window.getRandomArrayElement(sourceArray);
      if (randomArray.indexOf(randomElement) === -1) {
        randomArray.push(randomElement);
      }
    }
    return randomArray;
  };

  //Функция блокировки/разблокировки
  window.setFieldDisabled = function (inputFields, isDisabled) {
    for (var n = 0; n < inputFields.length; n++) {
      inputFields[n].disabled = isDisabled;
    }
  };

})();

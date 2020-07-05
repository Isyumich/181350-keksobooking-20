'use strict';

(function () {
  var ELEMENT_MAIN_WIDTH = 65;
  var ELEMENT_MAIN_HEIGHT = 65;
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

  // Получения адреса для метки
  var getAddress = function (isNotActive, pin, address) {
    var mainLocationX = Number.parseInt(pin.style.left, 10);
    var mainLocationY = Number.parseInt(pin.style.top, 10);
    isNotActive ? address.value = Math.round(mainLocationX - ELEMENT_MAIN_WIDTH / 2) + ', ' + Math.round(mainLocationY - ELEMENT_MAIN_HEIGHT / 2)
    : address.value = Math.round(mainLocationX - ELEMENT_MAIN_WIDTH / 2) + ', ' + Math.round(mainLocationY - ELEMENT_MAIN_HEIGHT);
      };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomArrayElement: getRandomArrayElement,
    getRandomArray: getRandomArray,
    setFieldDisabled: setFieldDisabled,
    getAddress: getAddress
  }
})();

(function () {
  var ESCAPE_BUTTON = 'Escape';

  var filterForm = document.querySelector('.map__filters');
  var form = document.querySelector('.ad-form');
  var body = document.querySelector('body');
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mainLocationXDefault = mapPinMain.style.left;
  var mainLocationYDefault = mapPinMain.style.top;

  // Функция возврата метки в исходное положение
  var getDefaultPinPosition = function () {
    mapPinMain.style.left = mainLocationXDefault;
    mapPinMain.style.top = mainLocationYDefault;
  }

  // Функция получения успешного сообщения
  var getSuccessMessage = function () {
    var successMessage = document.querySelector('#success').content.querySelector('.success');
    var elementSuccessMessage = successMessage.cloneNode(true);
    body.appendChild(elementSuccessMessage);
  };

  // Функция получения сообщения об ошибке
  var getErrorMessage = function () {
    var errorMessage = document.querySelector('#error').content.querySelector('.error');
    var elementErrorMessage = errorMessage.cloneNode(true);
    body.appendChild(elementErrorMessage);
  };

  // Функции закрытия сообщения об успешной закрузке
  var closeSuccessClickHandler = function () {
    var successMessageContainer = body.querySelector('.success');
    body.removeChild(successMessageContainer);
    form.reset();
    filterForm.reset();
    window.toggle.getAddress(true, mapPinMain, mainAddress);
    document.removeEventListener('click', closeSuccessClickHandler);
    document.removeEventListener('keydown', closeSuccessEscapeHandler);
  };

  var closeSuccessEscapeHandler = function (evt) {
    if (evt.key === ESCAPE_BUTTON) {
      closeSuccessClickHandler();
    }
  };

  // Функции закрытия сообщения об ошибке

  var closeErrorClickHandler = function () {
    var errorMessageContainer = body.querySelector('.error');
    body.removeChild(errorMessageContainer);
    filterForm.reset();
    form.reset();
    window.toggle.getAddress(true, mapPinMain, mainAddress);
    document.removeEventListener('click', closeErrorClickHandler);
    document.removeEventListener('keydown', closeErrorEscapeHandler);
  };

  var closeErrorEscapeHandler = function (evt) {
    if (evt.key === ESCAPE_BUTTON) {
      closeErrorClickHandler();
    }
  };

  var errorHandler = function () {
    getErrorMessage();

    var errorMessageContainer = body.querySelector('.error');
    var errorButton = errorMessageContainer.querySelector('.error__button');

    errorButton.addEventListener('click', closeErrorClickHandler);

    document.addEventListener('keydown', closeErrorEscapeHandler);

    document.addEventListener('click', closeErrorClickHandler);
  };

  var mainAddress = document.querySelector('#address');
  var inputAd = document.querySelectorAll('.ad-form__element');
  var inputMapFilters = document.querySelectorAll('.map__filter');
  var inputMapFeatures = document.querySelectorAll('.map__features');

  var setNotActiveMode = function () {
    var deleteCard = window.card.hiddenCardHandler(map);
    var adForm = document.querySelector('.ad-form');
    window.util.setFieldDisabled(inputAd, true);
    window.util.setFieldDisabled(inputMapFilters, true);
    window.util.setFieldDisabled(inputMapFeatures, true);
    map.classList.add('map--faded');
    deleteCard();
    window.pin.deleteAdElements();
    getDefaultPinPosition();
    adForm.classList.add('ad-form--disabled');
  }

  var onLoad = function () {
    getSuccessMessage();
    setNotActiveMode();

    document.addEventListener('keydown', closeSuccessEscapeHandler);
    document.addEventListener('click', closeSuccessClickHandler);
  };

  var submitHandler = function (evt) {
    window.backend.save(new FormData(form), onLoad, errorHandler);
    evt.preventDefault();
  };

  form.addEventListener('submit', submitHandler);

  var resetButton = document.querySelector('.ad-form__reset');

  resetButton.addEventListener('click', function () {
    filterForm.reset();
    form.reset();
    setNotActiveMode();
    window.toggle.getAddress(true, mapPinMain, mainAddress);
  })

  var showFilterPins = function () {
    window.pin.deleteAdElements();
    window.pin.renderAdElements();
    var cardElement = document.querySelector('.map__card');
    if (cardElement !== null) {
      map.removeChild(cardElement);
    }
  }

  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRooms = filterForm.querySelector('#housing-rooms');
  var housingGuests = filterForm.querySelector('#housing-guests');
  var features = filterForm.querySelectorAll('.map__checkbox');
  housingType.addEventListener('change', window.debounce.debounce(showFilterPins));
  housingPrice.addEventListener('change', window.debounce.debounce(showFilterPins));
  housingRooms.addEventListener('change', window.debounce.debounce(showFilterPins));
  housingGuests.addEventListener('change', window.debounce.debounce(showFilterPins));
  for (var feature of features) {
    feature.addEventListener('change', window.debounce.debounce(showFilterPins));
  };
})();

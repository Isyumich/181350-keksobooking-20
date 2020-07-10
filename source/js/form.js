(function () {
  var form = document.querySelector('.ad-form');
  var body = document.querySelector('body');

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
  var closeSuccessMessage = function () {
    var successMessageContainer = body.querySelector('.success');
    body.removeChild(successMessageContainer);
    form.reset();
    document.removeEventListener('click', closeSuccessMessage);
    document.removeEventListener('keydown', closeSuccessMessageEscape);
  };

  var closeSuccessMessageEscape = function (evt) {
    if (evt.key === 'Escape') {
      closeSuccessMessage();
    }
  };

  // Функции закрытия сообщения об ошибке

  var closeErrorMessage = function () {
    var errorMessageContainer = body.querySelector('.error');
    body.removeChild(errorMessageContainer);
    form.reset();
    document.removeEventListener('click', closeErrorMessage);
    document.removeEventListener('keydown', closeErrorMessageEscape);
  };

  var closeErrorMessageEscape = function (evt) {
    if (evt.key === 'Escape') {
      closeErrorMessage();
    }
  };

  var errorHandler = function () {
    getErrorMessage();

    var errorMessageContainer = body.querySelector('.error');
    var errorButton = errorMessageContainer.querySelector('.error__button');

    errorButton.addEventListener('click', closeErrorMessage);

    document.addEventListener('keydown', closeErrorMessageEscape);

    document.addEventListener('click', closeErrorMessage);
  };

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mainAddress = document.querySelector('#address');
  var inputAd = document.querySelectorAll('.ad-form__element');
  var inputMapFilters = document.querySelectorAll('.map__filter');
  var inputMapFeatures = document.querySelectorAll('.map__features');

  var onLoad = function () {
    getSuccessMessage();
    window.util.setFieldDisabled(inputAd, true);
    window.util.setFieldDisabled(inputMapFilters, true);
    window.util.setFieldDisabled(inputMapFeatures, true);
    window.isActiveMode.getAddress(true, mapPinMain, mainAddress);
    map.classList.add('map--faded');
    window.pin.deleteAdElements();

    document.addEventListener('keydown', closeSuccessMessageEscape);
    document.addEventListener('click', closeSuccessMessage);
  };

  var submitHandler = function (evt) {
    window.backend.save(new FormData(form), onLoad, errorHandler);
    evt.preventDefault();
  };

  form.addEventListener('submit', submitHandler);

  var resetButton = document.querySelector('.ad-form__reset');

  resetButton.addEventListener('click', function () {
    form.reset();
  })
})();

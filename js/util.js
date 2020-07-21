'use strict';

(function () {
  // Функция блокировки/разблокировки
  var setFieldDisabled = function (inputFields, isDisabled) {
      inputFields.forEach(function (item) {
          item.disabled = isDisabled;
      });
  };

  window.util = {
      setFieldDisabled: setFieldDisabled
  };
})();

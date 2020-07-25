'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];
  var IMAGE_WIDTH = 45;
  var IMAGE_HEIGHT = 40;
  var IMAGE_DESCRIPTION = 'Фотография жилья';
  var DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';

  var adFormField = document.querySelector('.ad-form__field');
  var adFormChooser = adFormField.querySelector('input[type=file]');
  var adFormHeaderPreview = document.querySelector('.ad-form-header__preview');
  var previewImage = adFormHeaderPreview.querySelector('img');

  adFormChooser.addEventListener('change', function () {
    var file = adFormChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewImage.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  var deleteUserAvatar = function () {
    previewImage.src = DEFAULT_AVATAR_SRC;
  };

  var adFormUpload = document.querySelector('.ad-form__upload');
  var housingPhotoChooser = adFormUpload.querySelector('input[type=file');
  var adFormPhoto = document.querySelector('.ad-form__photo');

  housingPhotoChooser.addEventListener('change', function () {
    var file = housingPhotoChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var img = document.createElement('img');
        img.width = IMAGE_WIDTH;
        img.height = IMAGE_HEIGHT;
        img.src = reader.result;
        img.alt = IMAGE_DESCRIPTION;
        adFormPhoto.appendChild(img);
      });

      reader.readAsDataURL(file);
    }

  });

  var deleteHousingImage = function () {
    var images = adFormPhoto.querySelectorAll('img');
    if (images.length !== 0) {
      for (var img of images) {
        adFormPhoto.removeChild(img);
      }
    }
  };

  window.file = {
    deleteUserAvatar: deleteUserAvatar,
    deleteHousingImage: deleteHousingImage
  };
})();

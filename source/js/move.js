'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mainAddress = document.querySelector('#address');

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (typeof evt === 'object') {
      if (evt.button === 0) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    dragged = true;

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
    mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

    window.util.getAddress(false, mapPinMain, mainAddress);
  };

  var onMouseUp = function (upEvt) {
upEvt.preventDefault();

document.removeEventListener('mousemove', onMouseMove);
document.removeEventListener('mouseup', onMouseUp);
/*if (dragged) {
  var onClickPreventDefault = function (clickEvt) {
    console.log(1);
  clickEvt.preventDefault();
  mapPinMain.removeEventListener('click', onClickPreventDefault)
};
mapPinMain.addEventListener('click', onClickPreventDefault);
}*/
window.util.getAddress(false, mapPinMain, mainAddress);
};

document.addEventListener('mousemove', onMouseMove);
document.addEventListener('mouseup', onMouseUp);
      }
}
});
})();

'use strict';

var Cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  GAP: 10,
  COLOR: '#fff',
  SHADOW_COLOR: 'rgba(0, 0, 0, 0.7)'
};

var Word = {
  FONT_SIZE: 16,
  FONT_FAMILY: 'PT Mono',
  NAMES_X: 150,
  NAMES_Y: 260,
  GAP: 5
};

var Bar = {
  WIDTH: 40,
  MAX_HEIGHT: 150,
  HORIZONTAL_GAP: 50,
  X: 150,
  Y: 240
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
};

var renderWord = function (ctx, options) {
  ctx.font = options.FONT_SIZE + 'px ' + options.FONT_FAMILY;
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var getRandomNum = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var randomColor = function () {
  return 'hsl(240, ' + getRandomNum(0, 100) + '%, 50%)';
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, Cloud.X + Cloud.GAP, Cloud.Y + Cloud.GAP, Cloud.SHADOW_COLOR);
  renderCloud(ctx, Cloud.X, Cloud.Y, Cloud.COLOR);

  var maxTime = getMaxElement(times);

  renderWord(ctx, Word);

  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', 150, 50);
  ctx.fillText('Список результатов:', 150, 65);

  for (var i = 0; i < names.length; i++) {
    var playerColor = randomColor();
    var barHeight = (Bar.MAX_HEIGHT * times[i]) / maxTime;
    var barPositionX = (Bar.WIDTH + Bar.HORIZONTAL_GAP) * i;

    ctx.fillStyle = (names[i] === 'Вы') ? '#ff0000' : playerColor;
    ctx.fillText(names[i], Word.NAMES_X + barPositionX, Word.NAMES_Y);
    ctx.fillStyle = (names[i] === 'Вы') ? '#ff0000' : playerColor;
    ctx.fillRect(Bar.X + barPositionX, Bar.Y, Bar.WIDTH, -barHeight);
    ctx.fillStyle = (names[i] === 'Вы') ? '#ff0000' : playerColor;
    ctx.fillText(Math.round(times[i]), Bar.X + barPositionX, Bar.Y - barHeight - Word.GAP);
  }
};

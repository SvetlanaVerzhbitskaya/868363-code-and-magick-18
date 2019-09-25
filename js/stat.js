'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 20;
var BAR_WIDTH = 40;
var MAX_HEIGHT = 150;
var BAR_GAP = 40;
var BAR_DISTANCE = 50;
var TEXT_COLOR = '#000';
var TEXT_HEIGHT = CLOUD_Y + GAP * 3 + FONT_GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

var writeWelcome = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.font = '16px Tahoma';
  ctx.fillText('Ура вы победили!', x, y);
  ctx.fillText('Список результатов:', x, y + FONT_GAP);
}

var writeText = function (ctx, t, x, y) {
  ctx.fillStyle = TEXT_COLOR;
  ctx.textBaseline = 'hanging';
  ctx.fillText(t, x, y);
};

var changeOrder = function (arr1, arr2, player) {
  for (var i = 0; i < arr1.length; i++) {
    if (arr1[i] === player) {
      var playerTransfer = arr1[0];
      var timeTransfer = arr2[0];
      arr1[0] = arr1[i];
      arr2[0] = arr2[i];
      arr1[i] = playerTransfer;
      arr2[i] = timeTransfer;
    }
  }
}

var choseColor = function (ctx, n, player) {
  if (n === player) {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  } else {
    ctx.fillStyle = 'hsl(240, ' + Math.random() * 100 + '%, 50%)';
    }
}

var drawColumn = function (ctx, x, y, height) {
  ctx.fillRect(x, y, BAR_WIDTH, height);
}

window.renderStatistics = function (ctx, NAMES, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  writeWelcome(ctx, CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3, TEXT_COLOR)

  var maxTime = getMaxElement(times);

  changeOrder(NAMES, times, 'Вы');

  for (var i = 0; i < NAMES.length; i++) {
    writeText(ctx, Math.round(times[i]), CLOUD_X + BAR_GAP + (BAR_DISTANCE + BAR_WIDTH) * i, CLOUD_Y + TEXT_HEIGHT + FONT_GAP + MAX_HEIGHT - MAX_HEIGHT * times[i] / maxTime - FONT_GAP)
    choseColor(ctx, NAMES[i], 'Вы');
    drawColumn(ctx, CLOUD_X + BAR_GAP + (BAR_DISTANCE + BAR_WIDTH) * i, CLOUD_Y + TEXT_HEIGHT + FONT_GAP + MAX_HEIGHT - MAX_HEIGHT * times[i] / maxTime, MAX_HEIGHT * times[i] / maxTime)
    writeText(ctx, NAMES[i], CLOUD_X + BAR_GAP + (BAR_DISTANCE + BAR_WIDTH) * i, CLOUD_Y + TEXT_HEIGHT + FONT_GAP + MAX_HEIGHT + GAP);
  }
};

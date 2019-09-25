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
var COLUMN_COLOR;
var TEXT_HEIGHT = CLOUD_Y + GAP * 3 + FONT_GAP;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}

window.renderStatistics = function (ctx, NAMES, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = '16px Tahoma';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3 + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var j = 0; j < NAMES.length; j++) {
    if (NAMES[j] === 'Вы') {
      var playerTransfer = NAMES[0];
      var timeTransfer = times[0];
      NAMES[0] = NAMES[j];
      times[0] = times[j];
      NAMES[j] = playerTransfer;
      times[j] = timeTransfer;
    }
  }

  for (var i = 0; i < NAMES.length; i++) {

    ctx.fillStyle = TEXT_COLOR;
    ctx.textBaseline = 'hanging';
    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_GAP + (BAR_DISTANCE + BAR_WIDTH) * i, CLOUD_Y + TEXT_HEIGHT + FONT_GAP + MAX_HEIGHT - MAX_HEIGHT * times[i] / maxTime - FONT_GAP);

    if (NAMES[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, '+ Math.random() * 100 +'%, 50%)';
    }

    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_DISTANCE + BAR_WIDTH) * i, CLOUD_Y + TEXT_HEIGHT + FONT_GAP + MAX_HEIGHT - MAX_HEIGHT * times[i] / maxTime, BAR_WIDTH, MAX_HEIGHT * times[i] / maxTime);

    ctx.fillStyle = TEXT_COLOR;
    ctx.textBaseline = 'hanging';
    ctx.fillText((NAMES[i]), CLOUD_X + BAR_GAP + (BAR_DISTANCE + BAR_WIDTH) * i, CLOUD_Y + TEXT_HEIGHT + FONT_GAP + MAX_HEIGHT + GAP);
  }
}

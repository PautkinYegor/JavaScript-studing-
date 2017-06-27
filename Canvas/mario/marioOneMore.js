//9 добавить в drawSpriteMap поддержку отрисовки карты любой размерности из заданных координат
// + избавиться от передачи completeCallback и загрузки спрайта в функции - drawSpriteMap, т.к. спрайт теперь общий и может грузиться только единовременно на старте
// + рисовать каждый объект отдельно в заданных координатах, а не пытаться рисовать карту и объект в drawSpriteMap
// + константные координаты тайлов в спрайтах именовать заглавными буквами
// + не смешивать camelCase и snake_case в именовании переменных и методов
// + разбить имеющиеся карты на отдельные объекты там, где это соотвествует здравому смыслу
// + вместо тайлов неба можно изначально заливать кадр соотвествующим цветом
// + function drawSpriteMap(spriteMap, offsetX, offsetY, canvasContext)

//Размер ячейки на карте
const CELL_SIZE = 16;
const WIDTH = 16;
const HEIGHT = 10;
const ZOOM_COEFF = 4;
const CANVAS_WIDTH = WIDTH * CELL_SIZE * ZOOM_COEFF;
const CANVAS_HEIGHT = HEIGHT * CELL_SIZE * ZOOM_COEFF;

//повторяющиеся элименты
const EMPTY = {x:0, y:0};
const GROUND = {x:3.88, y:5.8};
const BLOCK_BRICK = {x:3.88, y:1};
const BLOCK_IRON = {x:3.88, y:2.12};
const CLOUD1 = {x:4.12, y:23.5};
const CLOUD2 = {x:5.12, y:23.5};
const CLOUD3 = {x:6.12, y:23.5};
const CLOUD4 = {x:7.12, y:23.5};
const CLOUD5 = {x:4.12, y:24.5};
const CLOUD6 = {x:5.12, y:24.5};
const CLOUD7 = {x:6.12, y:24.5};
const CLOUD8 = {x:7.12, y:24.5};
const SHRUB11 = {x:1.08, y:19.15};
const SHRUB12 = {x:2.08, y:19.15};
const SHRUB21 = {x:7.28, y:19.15};
const SHRUB22 = {x:8.28, y:19.15};
const SHRUB23 = {x:9.28, y:19.15};

//объекты
function clouds() {
  return [
    [CLOUD1, CLOUD2, CLOUD3, CLOUD4],
    [CLOUD5, CLOUD6, CLOUD7, CLOUD8]
  ];
}
function mario() {
  return [
    [{x:1.55, y:21.7}]
  ];
}
function coin() {
  return [
    [{x:4.22, y:14.3}]
  ];
}
function shrub1() {
  return [
    [SHRUB11, SHRUB12]
  ];
}
function shrub2() {
  return [
    [SHRUB21, SHRUB22, SHRUB23]
  ]
}

//maps
const mapGround = [
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],  // 1ый ряд
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],  // 2ый ряд
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],  // 3ый ряд
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],  // 4ый ряд
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, BLOCK_BRICK, BLOCK_IRON, BLOCK_BRICK, BLOCK_IRON, BLOCK_BRICK, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],  // 5ый ряд
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],  // 6ый ряд
  [EMPTY, EMPTY, BLOCK_BRICK, BLOCK_IRON, BLOCK_BRICK, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],  // 7ый ряд
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],  // 8ый ряд
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],  // 9ый ряд
  [GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND, GROUND]  // 10ый ряд
];

function loadPicture(picture, pathImg, ctx, completeCallback) {
  picture.onload = completeCallback(ctx);
  picture.src = pathImg;
}

function calculate(value) {
  return (CELL_SIZE * ZOOM_COEFF * value);
}

function drawSpriteMap(picture, spriteMap, offsetX, offsetY, ctx) {
  let row = offsetX;
  let column = offsetY;
  for (let columnSM = 0; columnSM < spriteMap.length; columnSM ++) {
    for (let rowSM = 0; rowSM < spriteMap[0].length; rowSM ++) {
      let xWhereToStartClipping = (spriteMap[columnSM][rowSM].x - 1) * CELL_SIZE;
      let yWhereToStartClipping = (spriteMap[columnSM][rowSM].y - 1) * CELL_SIZE;
      const clippedImageWidth = CELL_SIZE;
      const clippedImageHeight = CELL_SIZE;

      let xWhereToPlaceImage = calculate(row);
      let yWhereToPlaceImage = calculate(column);
      const imageWidth = calculate(1);
      const imageHeight = calculate(1);

      ctx.drawImage(picture,
        xWhereToStartClipping,
        yWhereToStartClipping,
        clippedImageWidth,
        clippedImageHeight,
        xWhereToPlaceImage,
        yWhereToPlaceImage,
        imageWidth,
        imageHeight);
      row ++;
    }
    row = offsetX;
    column ++;
  }
}

// функция gameloop должна быть примерно следующей
// в ней не должны использоваться timeout-ы, игровой цикл создаётся на остнове рекусивного вызова через requestAnimationFrame
// requestAnimationFrame в параметрах callback передаёт текущий timestamp
function gameLoop(ctx, spriteImg, cloudX, timestamp, lastTimestamp) {
  const delta = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  //cloudSwim
  const CLOUD_X_MIN = -4;
  const CLOUD_X_MAX = WIDTH + 4;
  const CLOUD_SPEED = 0.003;

  let marioY = 8;

  //update model
  //move by 1 per 1000 ms
  const cloudDX = delta * CLOUD_SPEED;
  if (cloudDX > 0) {
    cloudX += cloudDX;
    cloudX = (cloudX < CLOUD_X_MAX) ? cloudX : CLOUD_X_MIN;
  }

  //draw model
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawSpriteMap(spriteImg, mapGround, 0, 0, ctx);
  drawSpriteMap(spriteImg, mario(), 1, marioY, ctx);
  drawSpriteMap(spriteImg, clouds(), cloudX, 0, ctx);
  drawSpriteMap(spriteImg, coin(), 7, 3, ctx);
  drawSpriteMap(spriteImg, coin(), 9, 3, ctx);
  drawSpriteMap(spriteImg, shrub1(), 3, 8, ctx);
  drawSpriteMap(spriteImg, shrub2(), 11, 8, ctx);

  requestAnimationFrame((timestamp) => {
    gameLoop(ctx, spriteImg, cloudX, timestamp, lastTimestamp);
  });
}

// Запуск игрового цикла также должен осуществляться через requestAnimationFrame
function startGame() {
  const canvas = document.getElementById('marioScene');
  canvas.style.backgroundColor = '#2f95ff';
  canvas.width  = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const ctx = canvas.getContext('2d');
  const spriteImg = new Image();

  let lastTimestamp = Date.now();

  loadPicture(spriteImg, 'img/all.png', ctx, () => {
    requestAnimationFrame((timestamp) => {
      gameLoop(ctx, spriteImg, 0, timestamp, lastTimestamp);
    });
  });
}
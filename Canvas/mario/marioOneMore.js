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

// function start() {
//   let canvas = document.getElementById("marioScene");
//   ctx = canvas.getContext('2d');
//   canvas.style.backgroundColor = '#2f95ff';
//   const picture = new Image();
//
//   // Размер холста равный 8х8 клеток
//   canvas.width  = WIDTH * CELL_SIZE * ZOOM_COEFF;
//   canvas.height = HEIGHT * CELL_SIZE * ZOOM_COEFF;
//
//     loadPicture(picture, (ctx) => {
//       drawSpriteMap(picture, mapGround, 0, 0, ctx);
//       drawSpriteMap(picture, mario(), 1, 8, ctx);
//       drawSpriteMap(picture, clouds(), 9, 0, ctx);
//       drawSpriteMap(picture, clouds(), 4, 0, ctx);
//       drawSpriteMap(picture, coin(), 7, 3, ctx);
//       drawSpriteMap(picture, coin(), 9, 3, ctx);
//       drawSpriteMap(picture, shrub1(), 3, 8, ctx);
//       drawSpriteMap(picture, shrub2(), 11, 8, ctx);
//     });
// }

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

//           gameloop:
function startGame() {
  const canvas = document.getElementById('marioScene');
  canvas.style.backgroundColor = '#2f95ff';
  canvas.width  = WIDTH * CELL_SIZE * ZOOM_COEFF;
  canvas.height = HEIGHT * CELL_SIZE * ZOOM_COEFF;

  const ctx = canvas.getContext('2d');
  const spriteImg = new Image();

  const CLOUD_X_MIN = -4;
  const CLOUD_X_MAX = WIDTH + 4;
  let cloudX = 0;

  let lastTimestamp = Date.now();
  let timeSinceLastMove = 0;
  function gameLoop() {
    const currentTimestamp = Date.now();
    const deltaTime = currentTimestamp - lastTimestamp;
    console.log(1000 / deltaTime);
    lastTimestamp = currentTimestamp;

    timeSinceLastMove += deltaTime;

    //update model
    //move by 1 per 1000 ms
    const cloudDX = Math.floor(timeSinceLastMove / 5);
    timeSinceLastMove -= cloudDX * 5;
    if (cloudDX > 0) {
      cloudX += cloudDX * 0.01;
      cloudX = (cloudX < CLOUD_X_MAX) ? cloudX : CLOUD_X_MIN;
    }

    //draw model
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSpriteMap(spriteImg, mapGround, 0, 0, ctx);
    drawSpriteMap(spriteImg, mario(), 1, 8, ctx);
    drawSpriteMap(spriteImg, clouds(), cloudX, 0, ctx);
    drawSpriteMap(spriteImg, coin(), 7, 3, ctx);
    drawSpriteMap(spriteImg, coin(), 9, 3, ctx);
    drawSpriteMap(spriteImg, shrub1(), 3, 8, ctx);
    drawSpriteMap(spriteImg, shrub2(), 11, 8, ctx);

    setTimeout(() => requestAnimationFrame(gameLoop), 10); //400 * Math.random()
  }

  loadPicture(spriteImg, 'img/all.png', ctx, gameLoop);
}

//9 добавить в drawSpriteMap поддержку отрисовки карты любой размерности из заданных координат
// - избавиться от передачи completeCallback и загрузки спрайта в функции - drawSpriteMap, т.к. спрайт теперь общий и может грузиться только единовременно на старте
// - рисовать каждый объект отдельно в заданных координатах, а не пытаться рисовать карту и объект в drawSpriteMap
// + константные координаты тайлов в спрайтах именовать заглавными буквами
// + не смешивать camelCase и snake_case в именовании переменных и методов
// - разбить имеющиеся карты на отдельные объекты там, где это соотвествует здравому смыслу
// + вместо тайлов неба можно изначально заливать кадр соотвествующим цветом
// - function drawSpriteMap(spriteMap, offsetX, offsetY, canvasContext)

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

const mapShrubsAndClouds = [
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, CLOUD1, CLOUD2, CLOUD3, CLOUD4, EMPTY, EMPTY, EMPTY],  // 1ый ряд
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, CLOUD5, CLOUD6, CLOUD7, CLOUD8, EMPTY, EMPTY, EMPTY],  // 2ый ряд
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],  // 3ый ряд
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],  // 4ый ряд
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],  // 5ый ряд
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],  // 6ый ряд
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],  // 7ый ряд
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],  // 8ый ряд
  [EMPTY, EMPTY, EMPTY, SHRUB11, SHRUB12, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, SHRUB21, SHRUB22, SHRUB23, EMPTY, EMPTY],  // 9ый ряд
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY]  // 10ый ряд
];

function start() {
  let canvas = document.getElementById("marioScene");
  ctx = canvas.getContext('2d');
  canvas.style.backgroundColor = '#2f95ff';

  // Размер холста равный 8х8 клеток
  canvas.width  = WIDTH * CELL_SIZE * ZOOM_COEFF;
  canvas.height = HEIGHT * CELL_SIZE * ZOOM_COEFF;

  //раскомментируйте код,  если хотите посмотреть нарисованную сцену
    drawSpriteMap(mapGround, ctx, true, mario(), 1, 8, (ctx) => {
      drawSpriteMap(mapShrubsAndClouds, ctx, true, clouds(), 4, 0);
    });
}

function calculate(value) {
  return (CELL_SIZE * ZOOM_COEFF * value);
}

function drawSpriteMap(map, ctx, supplement, object, mapX, mapY, completeCallback) {
  // - function drawSpriteMap(spriteMap, offsetX, offsetY, canvasContext)
  const pic = new Image();
  pic.onload = () => {

    for (let column = 0; column < map.length; column ++) {
      for (let row = 0; row < map[0].length; row ++) {
        let xWhereToStartClipping = (map[column][row].x - 1) * CELL_SIZE;
        let yWhereToStartClipping = (map[column][row].y - 1) * CELL_SIZE;
        const clippedImageWidth = CELL_SIZE;
        const clippedImageHeight = CELL_SIZE;

        let xWhereToPlaceImage = calculate(row);
        let yWhereToPlaceImage = calculate(column);
        const imageWidth = calculate(1);
        const imageHeight = calculate(1);

        // перебираем все значения массива 'карта' и в зависимости от координат вырисовываем нужный нам фрагмент
        ctx.drawImage(pic,
          xWhereToStartClipping,
          yWhereToStartClipping,
          clippedImageWidth,
          clippedImageHeight,
          xWhereToPlaceImage,
          yWhereToPlaceImage,
          imageWidth,
          imageHeight);
      }
    }
    if (supplement) {
      row = mapX;
      column = mapY;
      for (let columnO = 0; columnO < object.length; columnO ++) {
        for (let rowO = 0; rowO < object[0].length; rowO ++) {
          let xWhereToStartClipping = (object[columnO][rowO].x - 1) * CELL_SIZE;
          let yWhereToStartClipping = (object[columnO][rowO].y - 1) * CELL_SIZE;
          const clippedImageWidth = CELL_SIZE;
          const clippedImageHeight = CELL_SIZE;

          let xWhereToPlaceImage = calculate(row);
          let yWhereToPlaceImage = calculate(column);
          const imageWidth = calculate(1);
          const imageHeight = calculate(1);

          // перебираем все значения массива 'карта' и в зависимости от координат вырисовываем нужный нам фрагмент
          ctx.drawImage(pic,
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
        row = mapX;
        column ++;
      }
    }
    if (completeCallback) {
      completeCallback(ctx);
    }
  };
  pic.src = 'img/all.png';
}
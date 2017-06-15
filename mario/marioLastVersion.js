//9 добавить в drawSpriteMap поддержку отрисовки карты любой размерности из заданных координат

//Размер ячейки на карте
const CELL_SIZE = 16;
const CS_WIDTH = 16;
const CS_HEIGHT = 10;
const ZOOM_COEFF = 4;

//повторяющиеся элименты
const backgroundSky = {x:2.5, y:9.2};
const empty = {x:0, y:0};
const ground = {x:3.88, y:5.8};
const coin = {x:4.22, y:14.3};
const block_brick = {x:3.88, y:1};
const block_iron = {x:3.88, y:2.12};

//объекты
const clouds = [
  [{x:4.12, y:23.5}, {x:5.12, y:23.5}, {x:6.12, y:23.5}, {x:7.12, y:23.5}],
  [{x:4.12, y:24.5}, {x:5.12, y:24.5}, {x:6.12, y:24.5}, {x:7.12, y:24.5}]
];
const mario = [
  [{x:1.55, y:21.7}]
];

//maps
const map_sky = [
  [backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky],  // 1ый ряд
  [backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky],  // 2ой ряд
  [backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky],  // 3ий ряд
  [backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky],  // 4ый ряд
  [backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky],  // 5ый ряд
  [backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky],  // 6ой ряд
  [backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky],  // 7ой ряд
  [backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky],  // 8ой ряд
  [backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky],  // 9ый ряд
  [backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky, backgroundSky]  // 10ый ряд
];

const map_ground = [
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 1ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 2ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 3ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 4ый ряд
  [empty, empty, empty, empty, empty, empty, block_brick, block_iron, block_brick, block_iron, block_brick, empty, empty, empty, empty, empty],  // 5ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 6ый ряд
  [empty, empty, block_brick, block_iron, block_brick, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 7ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 8ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 9ый ряд
  [ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground]  // 10ый ряд
];

const map_coins = [
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 1ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 2ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 3ый ряд
  [empty, empty, empty, empty, empty, empty, empty, coin, empty, coin, empty, empty, empty, empty, empty, empty],  // 4ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 5ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 6ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 7ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 8ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 9ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty]  // 10ый ряд
];

const map_shrubsAndClouds = [
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, {x:4.12, y:23.5}, {x:5.12, y:23.5}, {x:6.12, y:23.5}, {x:7.12, y:23.5}, empty, empty, empty],  // 1ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, {x:4.12, y:24.5}, {x:5.12, y:24.5}, {x:6.12, y:24.5}, {x:7.12, y:24.5}, empty, empty, empty],  // 2ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 3ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 4ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 5ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 6ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 7ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty],  // 8ый ряд
  [empty, empty, empty, {x:1.08, y:19.15}, {x:2.08, y:19.15}, empty, empty, empty, empty, empty, empty, {x:7.28, y:19.15}, {x:8.28, y:19.15}, {x:9.28, y:19.15}, empty, empty],  // 9ый ряд
  [empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty, empty]  // 10ый ряд
];

function start() {
  let example = document.getElementById("example");
  ctx = example.getContext('2d');

  // Размер холста равный 8х8 клеток
  example.width  = CS_WIDTH * CELL_SIZE * ZOOM_COEFF;
  example.height = CS_HEIGHT * CELL_SIZE * ZOOM_COEFF;

  //раскомментируйте код,  если хотите посмотреть нарисованную сцену
  drawSpriteMap(map_sky, ctx, false, 0, 0, 0, (ctx) => {
    drawSpriteMap(map_ground, ctx, true, mario, 1, 8, (ctx) => {
      drawSpriteMap(map_coins, ctx, false);
      drawSpriteMap(map_shrubsAndClouds, ctx, true, clouds, 4, 0);
    });
  });
}

function calculate(value) {
  return (CELL_SIZE * ZOOM_COEFF * value);
}

function drawSpriteMap(map, ctx, supplement, object, mapX, mapY, completeCallback) { // object, mapX, mapY,
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

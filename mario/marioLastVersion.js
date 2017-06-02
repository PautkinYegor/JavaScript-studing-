/*
Урок 1. 

Первоисточник:
http://habrahabr.ru/post/111385/

В этой серии:
- Примитивы - неудобно и долго. Есть же картинки!
- Добавляем картинки
- Изменяем размер картинок

- Рисуем сложную сцену:
  - спрайты, чтобы побыстрее
  - нарезаем, увеличиваем
*/

  /*
  Стоит отметить что загрузка изображения происходит сразу после присвоения объекту источника изображения,
  и если оно не загрузится полностью к моменту вызова функции отрисовки, то оно попросту не будет нарисовано на холсте.

  //drawImage(image, x, y, width, height)  //  параметры width, height меняют ширину и высоту изображения

  drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  // Первый параметр указывает на изображение
  // sx, sy, sWidth, sHeight указывают параметры фрагмента на изображение-источнике
  // dx, dy, dWidth, dHeight ответственны за координаты отрисовки фрагмента на холсте
  */

//Размер ячейки на карте
const CELL_SIZE = 16;
const CS_WIDTH = 16;
const CS_HEIGHT = 10;
const ZOOM_COEFF = 4;
  
function start() {
  let example = document.getElementById("example");
  ctx = example.getContext('2d');
  example.width  = 1024;
  example.height = 640;

  // Размер холста равный 8х8 клеток
  example.width  = CS_WIDTH * CELL_SIZE * ZOOM_COEFF;
  example.height = CS_HEIGHT * CELL_SIZE * ZOOM_COEFF;

  //раскомментируйте код, если хотите посмотреть нарисованную сцену
  drawSky(ctx, (ctx) => {
    drawGround(ctx, (ctx) => {
      drawCeling(ctx);
      drawMario(ctx);
      drawCoins(ctx);
      drawShrub(ctx);
      drawClouds(ctx);
	});
  });

}

function drawSky(ctx, completeCallback) {
  const picFirst = new Image();
  picFirst.src = 'img/background colours.png';

  const map = // Карта уровня двумерным массивом
  [
    [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 1ый ряд
    [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 2ой ряд
    [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 3ий ряд
    [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 4ый ряд
    [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 5ый ряд
    [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 6ой ряд
    [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 7ой ряд
    [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 8ой ряд
    [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 9ый ряд
    [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}]  // 10ый ряд
  ];

  picFirst.onload = function() {
    for (let j = 0 ; j < CS_WIDTH; j ++) {
      for (let i = 0; i < CS_HEIGHT; i ++) {
        let xWhereToStartClipping = (map[i][j].x - 1) * CELL_SIZE;
        let yWhereToStartClipping = (map[i][j].y - 1) * CELL_SIZE;
        let clippedImageWidth = CELL_SIZE;
        let clippedImageHeight = CELL_SIZE;


        let xWhereToPlaceImage = j * CELL_SIZE * ZOOM_COEFF;
        let yWhereToPlaceImage = i * CELL_SIZE * ZOOM_COEFF;
        let imageWidth = CELL_SIZE * ZOOM_COEFF;
        let imageHeight = CELL_SIZE * ZOOM_COEFF;

        // перебираем все значения массива 'карта' и в зависимости от координат вырисовываем нужный нам фрагмент
        ctx.drawImage(picFirst,
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
    completeCallback(ctx);
  }
}

function drawGround(ctx, completeCallback) {
  const picSecond = new Image();
  picSecond.src = 'img/block.png';

  const map = // Карта уровня двумерным массивом
  [
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 1ый ряд
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 2ый ряд
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 3ый ряд
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 4ый ряд
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 5ый ряд
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 6ый ряд
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 7ый ряд
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 8ый ряд
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 9ый ряд
    [{x:1,y:5.8},{x:1,y:5.8},{x:1,y:5.8},{x:1,y:5.8},{x:1,y:5.8},{x:1,y:5.8},{x:1,y:5.8},{x:1,y:5.8},{x:1,y:5.8},{x:1,y:5.8},{x:1,y:5.8},{x:1,y:5.8},{x:1,y:5.8},{x:1,y:5.8},{x:1,y:5.8},{x:1,y:5.8}]  // 10ый ряд
  ];

  picSecond.onload = function() {
  for (let j = 0; j < CS_WIDTH; j++) {
	for (let i = 0; i < CS_HEIGHT; i++) {
	  let xWhereToStartClipping = (map[i][j].x - 1) * CELL_SIZE;
	  let yWhereToStartClipping = (map[i][j].y - 1) * CELL_SIZE;
	  let clippedImageWidth = CELL_SIZE;
	  let clippedImageHeight = CELL_SIZE;


	  let xWhereToPlaceImage = j * CELL_SIZE * ZOOM_COEFF;
	  let yWhereToPlaceImage = i * CELL_SIZE * ZOOM_COEFF;
	  let imageWidth = CELL_SIZE * ZOOM_COEFF;
	  let imageHeight = CELL_SIZE * ZOOM_COEFF;

	  // перебираем все значения массива 'карта' и в зависимости от координат вырисовываем нужный нам фрагмент
	  ctx.drawImage(picSecond,
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
  completeCallback(ctx);
  }
}

function drawCeling(ctx) {
  const picThird = new Image();
  picThird.src = 'img/block.png';

  const map = // Карта уровня двумерным массивом
  [
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 1ый ряд
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 2ый ряд
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 3ый ряд
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 4ый ряд
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:1,y:1},{x:1,y:2.12},{x:1,y:1},{x:1,y:2.12},{x:1,y:1},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 5ый ряд
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 6ый ряд
    [{x:0,y:0},{x:0,y:0},{x:1,y:1},{x:1,y:2.12},{x:1,y:1},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 7ый ряд
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 8ый ряд
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 9ый ряд
    [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}]  // 10ый ряд
  ];

  picThird.onload = function() {
  for (let j = 0; j < CS_WIDTH; j++)
  {
    for (let i = 0; i < CS_HEIGHT; i++)
    {
      let xWhereToStartClipping = (map[i][j].x - 1) * CELL_SIZE;
      let yWhereToStartClipping = (map[i][j].y - 1) * CELL_SIZE;
      let clippedImageWidth = CELL_SIZE;
      let clippedImageHeight = CELL_SIZE;


      let xWhereToPlaceImage = j * CELL_SIZE * ZOOM_COEFF;
      let yWhereToPlaceImage = i * CELL_SIZE * ZOOM_COEFF;
      let imageWidth = CELL_SIZE * ZOOM_COEFF;
      let imageHeight = CELL_SIZE * ZOOM_COEFF;

      // перебираем все значения массива 'карта' и в зависимости от координат вырисовываем нужный нам фрагмент
      ctx.drawImage(picThird,
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
  }
}

function drawMario(ctx) {
  const picFourth = new Image();
  picFourth.src = 'img/mario.png';

  const map = // Карта уровня двумерным массивом
    [
      [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 1ый ряд
      [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 2ый ряд
      [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 3ый ряд
      [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 4ый ряд
      [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 5ый ряд
      [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 6ый ряд
      [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 7ый ряд
      [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 8ый ряд
      [{x:0,y:0},{x:1,y:1},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 9ый ряд
      [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}]  // 10ый ряд
    ];

  picFourth.onload = function() {
    for (let j = 0; j < CS_WIDTH; j++)
    {
      for (let i = 0; i < CS_HEIGHT; i++)
      {
        let xWhereToStartClipping = (map[i][j].x - 1) * CELL_SIZE;
        let yWhereToStartClipping = (map[i][j].y - 1) * CELL_SIZE;
        let clippedImageWidth = CELL_SIZE;
        let clippedImageHeight = CELL_SIZE;


        let xWhereToPlaceImage = j * CELL_SIZE * ZOOM_COEFF;
        let yWhereToPlaceImage = i * CELL_SIZE * ZOOM_COEFF;
        let imageWidth = CELL_SIZE * ZOOM_COEFF;
        let imageHeight = CELL_SIZE * ZOOM_COEFF;

        // перебираем все значения массива 'карта' и в зависимости от координат вырисовываем нужный нам фрагмент
        ctx.drawImage(picFourth,
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
  }
}

function drawCoins(ctx) {
    const picFifth = new Image();
    picFifth.src = 'img/coins.png';

    const map = // Карта уровня двумерным массивом
        [
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 1ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 2ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 3ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0.7,y:0.9},{x:0,y:0},{x:0.7,y:0.9},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 4ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 5ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 6ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 7ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 8ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 9ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}]  // 10ый ряд
        ];

    picFifth.onload = function() {
        for (let j = 0; j < CS_WIDTH; j++)
        {
            for (let i = 0; i < CS_HEIGHT; i++)
            {
                let xWhereToStartClipping = (map[i][j].x - 1) * CELL_SIZE;
                let yWhereToStartClipping = (map[i][j].y - 1) * CELL_SIZE;
                let clippedImageWidth = CELL_SIZE;
                let clippedImageHeight = CELL_SIZE;


                let xWhereToPlaceImage = j * CELL_SIZE * ZOOM_COEFF;
                let yWhereToPlaceImage = i * CELL_SIZE * ZOOM_COEFF;
                let imageWidth = CELL_SIZE * ZOOM_COEFF;
                let imageHeight = CELL_SIZE * ZOOM_COEFF;

                // перебираем все значения массива 'карта' и в зависимости от координат вырисовываем нужный нам фрагмент
                ctx.drawImage(picFifth,
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
    }
}

function drawShrub(ctx) {
    const picSixth = new Image();
    picSixth.src = 'img/shrub.png';

    const map = // Карта уровня двумерным массивом
        [
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 1ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 2ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 3ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 4ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 5ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 6ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 7ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 8ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:1,y:1},{x:2,y:1},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:7.2,y:1},{x:8.2,y:1},{x:9.2,y:1},{x:10.2,y:1},{x:0,y:0}], // 9ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}]  // 10ый ряд
        ];

    picSixth.onload = function() {
        for (let j = 0; j < CS_WIDTH; j++)
        {
            for (let i = 0; i < CS_HEIGHT; i++)
            {
                let xWhereToStartClipping = (map[i][j].x - 1) * CELL_SIZE;
                let yWhereToStartClipping = (map[i][j].y - 1) * CELL_SIZE;
                let clippedImageWidth = CELL_SIZE;
                let clippedImageHeight = CELL_SIZE;


                let xWhereToPlaceImage = j * CELL_SIZE * ZOOM_COEFF;
                let yWhereToPlaceImage = i * CELL_SIZE * ZOOM_COEFF;
                let imageWidth = CELL_SIZE * ZOOM_COEFF;
                let imageHeight = CELL_SIZE * ZOOM_COEFF;

                // перебираем все значения массива 'карта' и в зависимости от координат вырисовываем нужный нам фрагмент
                ctx.drawImage(picSixth,
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
    }
}

function drawClouds(ctx) {
    const picSeventh = new Image();
    picSeventh.src = 'img/clouds.png';

    const map = // Карта уровня двумерным массивом
        [
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:4.1,y:1},{x:5.1,y:1},{x:6.1,y:1},{x:7.1,y:1},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 1ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:4.1,y:2},{x:5.1,y:2},{x:6.1,y:2},{x:7.1,y:2},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 2ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 3ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 4ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 5ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 6ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 7ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 8ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 9ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}]  // 10ый ряд
        ];

    picSeventh.onload = function() {
        for (let j = 0; j < CS_WIDTH; j++)
        {
            for (let i = 0; i < CS_HEIGHT; i++)
            {
                let xWhereToStartClipping = (map[i][j].x - 1) * CELL_SIZE;
                let yWhereToStartClipping = (map[i][j].y - 1) * CELL_SIZE;
                let clippedImageWidth = CELL_SIZE;
                let clippedImageHeight = CELL_SIZE;


                let xWhereToPlaceImage = j * CELL_SIZE * ZOOM_COEFF;
                let yWhereToPlaceImage = i * CELL_SIZE * ZOOM_COEFF;
                let imageWidth = CELL_SIZE * ZOOM_COEFF;
                let imageHeight = CELL_SIZE * ZOOM_COEFF;

                // перебираем все значения массива 'карта' и в зависимости от координат вырисовываем нужный нам фрагмент
                ctx.drawImage(picSeventh,
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
    }
}
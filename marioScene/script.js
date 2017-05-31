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
CELL_SIZE = 16;
CELLS_COUNT = 8;
ZOOM_COEFF = 4;
  
function start()
{  
	var example = document.getElementById("example"),
	ctx     = example.getContext('2d');
	example.width  = 640;
	example.height = 480;

	// Размер холста равный 8х8 клеток
	example.width  = CELLS_COUNT * CELL_SIZE * ZOOM_COEFF;
	example.height = CELLS_COUNT * CELL_SIZE * ZOOM_COEFF;

	//раскомментируйте код, если хотите посмотреть нарисованную сцену
	drawSky(ctx);
    drawGround(ctx);

}

function drawSky(ctx)
{
	pic = new Image();
	pic.src = 'img/background colours.png';
	
	map = // Карта уровня двумерным массивом
	[
		[{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 1ый ряд
		[{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 2ый ряд
		[{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 3ый ряд
		[{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 4ый ряд
		[{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 5ый ряд
		[{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 6ый ряд
		[{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}], // 7ый ряд
		[{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}] // 8ый ряд
	];
	
	pic.onload = function() { 	
		for (var j = 0 ; j < CELLS_COUNT; j ++)
		{
			for (var i = 0; i < CELLS_COUNT; i ++)
			{
				var xWhereToStartClipping = (map[i][j].x - 1) * CELL_SIZE;
				var yWhereToStartClipping = (map[i][j].y - 1) * CELL_SIZE;
				var clippedImageWidth = CELL_SIZE;
				var clippedImageHeight = CELL_SIZE;


				var xWhereToPlaceImage = j * CELL_SIZE * ZOOM_COEFF;
				var yWhereToPlaceImage = i * CELL_SIZE * ZOOM_COEFF;
				var imageWidth = CELL_SIZE * ZOOM_COEFF;
				var imageHeight = CELL_SIZE * ZOOM_COEFF;

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
	}
}

function drawGround(ctx)
{
    pic = new Image();
    pic.src = 'img/block.png';

    map = // Карта уровня двумерным массивом
        [
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 1ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 2ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 3ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 4ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 5ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 6ый ряд
            [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}], // 7ый ряд
            [{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1},{x:1,y:1}] // 8ый ряд
        ];

    pic.onload = function() {
        for (var j = 0 ; j < CELLS_COUNT; j ++)
        {
            for (var i = 0; i < CELLS_COUNT; i ++)
            {
            	if (j == 7) {
                    var xWhereToStartClipping = (map[i][j].x - 1) * CELL_SIZE;
                    var yWhereToStartClipping = (map[i][j].y - 1) * CELL_SIZE;
                    var clippedImageWidth = CELL_SIZE;
                    var clippedImageHeight = CELL_SIZE;


                    var xWhereToPlaceImage = j * CELL_SIZE * ZOOM_COEFF;
                    var yWhereToPlaceImage = i * CELL_SIZE * ZOOM_COEFF;
                    var imageWidth = CELL_SIZE * ZOOM_COEFF;
                    var imageHeight = CELL_SIZE * ZOOM_COEFF;

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
                    console.log('yes');
				}



            }
        }
    }
}
const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 480;
const CELL_SIZE = 119;

function getEmptyCell() { // функция возвращает координаты пустой клетки(внутри массива)
  for (let column0 = 0; column0 < 16; ++column0) {
    if (cells[column0].isEmpty) {
      return{"x0" : cells[column0].x, "y0" : cells[column0].y, "column0" : column0};
    }
  }
}

function getClick(clickX, clickY) { // функция возвращает координаты активной клетки(внутри массива)
  for (let column1 = 0; column1 < 16; ++column1) {
    if ((clickX === cells[column1].x) &&
      (clickY === cells[column1].y)) {
      return {"column1" : column1};
    }
  }
}

function createCell(num) {
  let isEmpty = false;
  let y = Math.floor(num/4);
  let x = Math.floor(num - y * 4 - 1);
  if (x === -1) {
    x = 3;
    if (num === 0) {
      isEmpty = true;
      y = 3;
    } else {
      y = y - 1;
    }
  }
  x = x * CELL_SIZE;
  y = y * CELL_SIZE;
  console.log(y, ':', x, '   num ', num);
  return {
    isEmpty: isEmpty,
    value: num,
    isSelected: false,
    x: x,
    y: y,
  }
}

let cells = [
  createCell(1), createCell(2), createCell(3), createCell(4),
  createCell(5), createCell(6), createCell(7), createCell(8),
  createCell(9), createCell(10), createCell(11), createCell(12),
  createCell(13), createCell(14), createCell(15), createCell(0),
];

function determinationOfWin(clicks) {
  let flag = true;
  for (let column = 0; column < cells.length && flag === true; ++column) {
    let y = Math.floor(cells[column].value / 4);
    let x = Math.floor(cells[column].value - y * 4 - 1);
    if (x === -1) {
      x = 3;
      if (cells[column].value === 0) {
        y = 3;
      } else {
        y = y - 1;
      }
    }
    x = x * CELL_SIZE;
    y = y * CELL_SIZE;
    ((cells[column].x === x) && (cells[column].y === y)) ? flag = true : flag = false;
  }
  if (flag === true) {
    alert('Вы собрали пятнашки за ' + clicks + ' клик!');
  }
}

// canvas.onmousemove = (event) {
// 	const coords = convertToGameFieldCoords(event.layerX, event.layerY);
// 	const plateIndex = convertToPlateIndex(coords.x, coords.y);
//
// 	hideSelection() //выключает выделение у всех элементов
// 	select(plateIndex.row, plateIndex.column); //включает выделение у элемента
// }
function shiftCells(stepsCount) {
  for (let step = 0; step < stepsCount; ++step) {
    let number1 = Math.floor(Math.random() * 16);
    let number2 = Math.floor(Math.random() * 16);
    let num1X = cells[number1].x;
    let num1Y = cells[number1].y;
    cells[number1].x = cells[number2].x;
    cells[number1].y = cells[number2].y;
    cells[number2].x = num1X;
    cells[number2].y = num1Y;
  }
}

function drawCells(ctx) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  for (let column = 0; column < cells.length; ++column) {
    if (!cells[column].isEmpty) {
      const sizeOfSquare = 116;
      ctx.fillStyle = "silver";
      ctx.fillRect(3 + cells[column].x/CELL_SIZE * (sizeOfSquare + 3),
          3 + cells[column].y/CELL_SIZE * (sizeOfSquare + 3), sizeOfSquare, sizeOfSquare);
      ctx.font = "italic 40pt Times New Roman";
      ctx.fillStyle = "black";
      const fontWidth = 60;
      const fontForY = 80 + cells[column].y/CELL_SIZE * sizeOfSquare;
      const fontForX1 = 40 + cells[column].x/CELL_SIZE * sizeOfSquare;
      const fontForX2 = 50 + cells[column].x/CELL_SIZE * sizeOfSquare;
      if (cells[column].value >= 10) {
        ctx.fillText('' + cells[column].value, fontForX1, fontForY, fontWidth);
      } else if (cells[column].value <= 10) {
        ctx.fillText('' + cells[column].value, fontForX2, fontForY, fontWidth);
      }
    }
  }
}


function startGame() {
  const canvas = document.getElementById("puzzle15");
  const ctx = canvas.getContext("2d");
  canvas.style.backgroundColor = 'black';
  canvas.style.margin = 10;
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  let clicks = 0;

  //let lastTimestamp = Date.now();
  canvas.onclick = (event) => {
    let columnClick = Math.floor((event.pageX - 15)/CELL_SIZE) * CELL_SIZE;
    let rowClick = Math.floor((event.pageY - 15)/CELL_SIZE) * CELL_SIZE;
    let column1 = getClick(columnClick, rowClick).column1;
    let x0 = getEmptyCell().x0;
    let y0 = getEmptyCell().y0;
    let column0 = getEmptyCell().column0;
    if (((columnClick - CELL_SIZE === x0 || columnClick + CELL_SIZE === x0) && rowClick === y0)
        || ((rowClick - CELL_SIZE === y0 || rowClick + CELL_SIZE === y0) && columnClick === x0)) {
      cells[column1].x = x0;
      cells[column1].y = y0;
      cells[column0].x = columnClick;
      cells[column0].y = rowClick;
      ++clicks;
      determinationOfWin(clicks);
    }
  };
  shiftCells(30);
  function gameLoop(ctx) {
    // const delta = timestamp - lastTimestamp;
    // lastTimestamp = timestamp;

    //draw model
    drawCells(ctx);

    requestAnimationFrame(()=> {
      gameLoop(ctx);
    });
  }
  requestAnimationFrame(()=> {
    gameLoop(ctx);
  });
}

startGame();
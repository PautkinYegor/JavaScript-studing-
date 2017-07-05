const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 480;
const CELL_SIZE = 119;
const FILL_SIZE = 4;
let animation = false;
const SQUARE_SPEED = 0.2;

function getEmptyCellIndex() { // функция возвращает индекс пустой клетки(внутри массива)
  for (let index = 0; index < FILL_SIZE * FILL_SIZE; ++index) {
    if (cells[index].isEmpty) {
      return index;
    }
  }
}

function getActiveIndex(event) { // функция возвращает индекс активной клетки(внутри массива)
  let clickX = Math.floor((event.pageX - 15)/CELL_SIZE) * CELL_SIZE;
  let clickY = Math.floor((event.pageY - 15)/CELL_SIZE) * CELL_SIZE;
  for (let index = 0; index < FILL_SIZE * FILL_SIZE; ++index) {
    if ((clickX === cells[index].x) &&
      (clickY === cells[index].y)) {
      return index;
    }
  }
}

function createCell(num) {
  let isEmpty = false;
  let y = Math.floor(num/4);
  let x = Math.floor(num - y * 4 - 1);
  if (x === -1) {
    x = 3;
    y = (num === 0) ? 3 : y - 1;
    isEmpty = (num === 0) ? true : isEmpty;
  }
  x = x * CELL_SIZE;
  y = y * CELL_SIZE;
  return {
    isEmpty: isEmpty,
    value: num,
    isSelected: false,
    x: x,
    y: y,
    animationDirectionX: 0,
    animationDirectionY: 0,
  }
}

function determinationMovement(activeCell, x0, y0) {
  if (activeCell.x - CELL_SIZE === x0) {
    activeCell.animationDirectionX = -CELL_SIZE;
  } else if (activeCell.x + CELL_SIZE === x0) {
    activeCell.animationDirectionX = CELL_SIZE;
  }
  if (activeCell.y - CELL_SIZE === y0) {
    activeCell.animationDirectionY = -CELL_SIZE;
  } else if (activeCell.y + CELL_SIZE === y0){
    activeCell.animationDirectionY = CELL_SIZE;
  }
}

function getCellWithAnimation() {
  for (let index = 0; index < cells.length; ++index) {
    if ((cells[index].animationDirectionX !== 0) || (cells[index].animationDirectionY !== 0)) {
      return index;
    }
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
      y = (cells[column].value === 0) ? 3 : y - 1;
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
    let number1 = Math.floor(Math.random() * FILL_SIZE * FILL_SIZE);
    let number2 = Math.floor(Math.random() * FILL_SIZE * FILL_SIZE);
    let num1X = cells[number1].x;
    let num1Y = cells[number1].y;
    cells[number1].x = cells[number2].x;
    cells[number1].y = cells[number2].y;
    cells[number2].x = num1X;
    cells[number2].y = num1Y;
  }
}

function drawCells(ctx, locationSquare, activeCell) {
  let differenceOfLocation = (locationSquare > 0) ? (CELL_SIZE - locationSquare) : (CELL_SIZE + locationSquare);
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  for (let column = 0; column < cells.length; ++column) {
    if (!cells[column].isEmpty) {
      let cellX = cells[column].x;
      let cellY = cells[column].y;
      const sizeOfSquare = 116;
      if (cells[column] === activeCell) {
        if ((activeCell.animationDirectionY === CELL_SIZE) || (activeCell.animationDirectionY === -CELL_SIZE)) {
          cellY = (activeCell.animationDirectionY === CELL_SIZE) ? (cellY - differenceOfLocation) : (cellY + differenceOfLocation);
        } else if ((activeCell.animationDirectionX === CELL_SIZE) || (activeCell.animationDirectionX === -CELL_SIZE)) {
          cellX = (activeCell.animationDirectionX === CELL_SIZE) ? (cellX - differenceOfLocation) : (cellX + differenceOfLocation);
        }
      }
      ctx.fillStyle = "silver";
      ctx.fillRect(3 + cellX, 3 + cellY, sizeOfSquare, sizeOfSquare);
      ctx.font = "italic 40pt Times New Roman";
      ctx.fillStyle = "black";
      const fontWidth = 60;
      const fontForY = 80 + cellY / CELL_SIZE * sizeOfSquare;
      const fontForX1 = 40 + cellX / CELL_SIZE * sizeOfSquare;
      const fontForX2 = 50 + cellX / CELL_SIZE * sizeOfSquare;
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

  canvas.onclick = (event) => {
    if (animation === true) {return;}
    let activeIndex = getActiveIndex(event);
    let activeCell = cells[activeIndex];
    let emptyCellIndex = getEmptyCellIndex();
    let emptyCell = cells[emptyCellIndex];
    let emptyCellX = emptyCell.x;
    let emptyCellY = emptyCell.y;
    if (((activeCell.x - CELL_SIZE === emptyCellX || activeCell.x + CELL_SIZE === emptyCellX) && activeCell.y === emptyCellY)
       || ((activeCell.y - CELL_SIZE === emptyCellY || activeCell.y + CELL_SIZE === emptyCellY) && activeCell.x === emptyCellX)) {
      determinationMovement(activeCell, emptyCellX, emptyCellY);
      animation = true;
      emptyCell.x = activeCell.x;
      emptyCell.y = activeCell.y;
      activeCell.x = emptyCellX;
      activeCell.y = emptyCellY;
      ++clicks;
      determinationOfWin(clicks);
    }
  };
  let activeIndex = getCellWithAnimation();
  let activeCell = cells[activeIndex];

  let lastTimestamp = Date.now();
  shiftCells(30);

  function gameLoop(ctx, locationSquare, timestamp, activeCell) {
    const delta = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    let moving = 0;
    if (animation === true) {
      activeIndex = getCellWithAnimation();
      activeCell = cells[activeIndex];
      let activeY = activeCell.animationDirectionY;
      let activeX = activeCell.animationDirectionX;
      if (!(activeX === 0) || !(activeY === 0)) {
        moving = (!(activeX === 0)) ? activeX : activeY;

        //move by 1 per 1000 ms
        let squareMove = delta * SQUARE_SPEED;
        if (squareMove > 0) {
          if (moving > 0) {
            locationSquare = locationSquare + squareMove;
            locationSquare = (locationSquare < CELL_SIZE) ? locationSquare : CELL_SIZE;
          } else {
            locationSquare = locationSquare - squareMove;
            locationSquare = (locationSquare > -CELL_SIZE) ? locationSquare : -CELL_SIZE;
          }
          console.log('locationSquare:', locationSquare);
          if ((locationSquare === CELL_SIZE) || (locationSquare === -CELL_SIZE)) {
            locationSquare = 0;
            activeCell.animationDirectionY = 0;
            activeCell.animationDirectionX = 0;
            animation = false;
          }
        }
      }
    }

    //draw model
    drawCells(ctx, locationSquare, activeCell);

    requestAnimationFrame((timestamp)=> {
      gameLoop(ctx, locationSquare, timestamp, activeCell);
    });
  }
  requestAnimationFrame((timestamp)=> {
    gameLoop(ctx, 0, timestamp, activeCell);
  });
}

startGame();
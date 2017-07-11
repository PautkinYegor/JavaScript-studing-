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
  let clickX = Math.floor((event.pageX - 15) / CELL_SIZE) * CELL_SIZE;
  let clickY = Math.floor((event.pageY - 15) / CELL_SIZE) * CELL_SIZE;
  for (let index = 0; index < FILL_SIZE * FILL_SIZE; ++index) {
    if ((clickX === cells[index].x) &&
      (clickY === cells[index].y)) {
      return index;
    }
  }
}

function createCell(num) {
  let animationDirectionX = 0;
  let animationDirectionY = 0;
  let isEmpty = false;
  let y = Math.floor(num / FILL_SIZE);
  let x = Math.floor(num - y * FILL_SIZE - 1);
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
    animationDirectionX: animationDirectionX,
    animationDirectionY: animationDirectionY,
    futureX: x,
    futureY: y,
    move: (deltaTimestamp) => {
      let index = num - 1;
      index = (index === -1) ? 15 : index;
      let squareMove = deltaTimestamp * SQUARE_SPEED;
      if ((cells[index].animationDirectionX !== 0) || (cells[index].animationDirectionY !== 0)) {
        if (cells[index].animationDirectionX > 0) {
          cells[index].animationDirectionX = cells[index].animationDirectionX - squareMove;
          cells[index].x = cells[index].x + squareMove;
          cells[index].animationDirectionX = (cells[index].animationDirectionX < 0) ? 0 : cells[index].animationDirectionX;
          cells[index].x = (cells[index].animationDirectionX === 0) ? cells[index].futureX : cells[index].x;
        } else if (cells[index].animationDirectionX < 0) {
          cells[index].animationDirectionX = cells[index].animationDirectionX + squareMove;
          cells[index].x = cells[index].x - squareMove;
          cells[index].animationDirectionX = (cells[index].animationDirectionX > 0) ? 0 : cells[index].animationDirectionX;
          cells[index].x = (cells[index].animationDirectionX === 0) ? cells[index].futureX : cells[index].x;
        } else if (cells[index].animationDirectionY > 0) {
          cells[index].animationDirectionY = cells[index].animationDirectionY - squareMove;
          cells[index].y = cells[index].y + squareMove;
          cells[index].animationDirectionY = (cells[index].animationDirectionY < 0) ? 0 : cells[index].animationDirectionY;
          cells[index].y = (cells[index].animationDirectionY === 0) ? cells[index].futureY : cells[index].y;
        } else if (cells[index].animationDirectionY < 0) {
          cells[index].animationDirectionY = cells[index].animationDirectionY + squareMove;
          cells[index].y = cells[index].y - squareMove;
          cells[index].animationDirectionY = (cells[index].animationDirectionY > 0) ? 0 : cells[index].animationDirectionY;
          cells[index].y = (cells[index].animationDirectionY === 0) ? cells[index].futureY : cells[index].y;
        }
      }
    },
    x: x,
    y: y,
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

let cells = [
  createCell(1), createCell(2), createCell(3), createCell(4),
  createCell(5), createCell(6), createCell(7), createCell(8),
  createCell(9), createCell(10), createCell(11), createCell(12),
  createCell(13), createCell(14), createCell(15), createCell(0),
];

function determinationOfWin(quantityClicks) {
  let flag = true;
  for (let index = 0; index < cells.length && flag === true; ++index) {
    let y = Math.floor(cells[index].value / FILL_SIZE);
    let x = Math.floor(cells[index].value - y * FILL_SIZE - 1);
    if (x === -1) {
      x = 3;
      y = (cells[index].value === 0) ? 3 : y - 1;
    }
    x = x * CELL_SIZE;
    y = y * CELL_SIZE;
    ((cells[index].x === x) && (cells[index].y === y)) ? flag = true : flag = false;
  }
  if (flag === true) {
    alert('Вы собрали пятнашки за ' + quantityClicks + ' клик!');
  }
}

// canvas.onmousemove = (event) {
// 	const coords = convertToGameFieldCoords(event.layerX, event.layerY);
// 	const plateIndex = convertToPlateIndex(coords.x, coords.y);
//
// 	hideSelection() //выключает выделение у всех элементов
// 	select(plateIndex.row, plateIndex.index); //включает выделение у элемента
// }
function shiftCells(stepsCount) {
  for (let step = 0; step < stepsCount; ++step) {
    let firstNumber = Math.floor(Math.random() * FILL_SIZE * FILL_SIZE);
    let secondNumber = Math.floor(Math.random() * FILL_SIZE * FILL_SIZE);
    let firstNumberX = cells[firstNumber].x;
    let firstNumberY = cells[firstNumber].y;
    cells[firstNumber].x = cells[secondNumber].x;
    cells[firstNumber].y = cells[secondNumber].y;
    cells[secondNumber].x = firstNumberX;
    cells[secondNumber].y = firstNumberY;
  }
}

function drawCell(ctx) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  for (let index = 0; index < cells.length; ++index) {
    if (!cells[index].isEmpty) {
      let cellX = cells[index].x;
      let cellY = cells[index].y;
      const sizeOfSquare = 116;
      ctx.fillStyle = "silver";
      ctx.fillRect(3 + cellX, 3 + cellY, sizeOfSquare, sizeOfSquare);
      ctx.font = "italic 40pt Times New Roman";
      ctx.fillStyle = "black";
      const fontWidth = 60;
      const fontForY = 80 + cellY / CELL_SIZE * sizeOfSquare;
      const fontForX1 = 40 + cellX / CELL_SIZE * sizeOfSquare;
      const fontForX2 = 50 + cellX / CELL_SIZE * sizeOfSquare;
      if (cells[index].value >= 10) {
        ctx.fillText('' + cells[index].value, fontForX1, fontForY, fontWidth);
      } else if (cells[index].value <= 10) {
        ctx.fillText('' + cells[index].value, fontForX2, fontForY, fontWidth);
      }
    }
  }
}

function checkAnimation(deltaTimestamp) {
  let flag = false;
  for (let index = 0; index < cells.length && flag === false; ++index) {
    cells[index].move(deltaTimestamp);
    if ((cells[index].animationDirectionX !== 0) || (cells[index].animationDirectionY !== 0)) {
      flag = true;
    }
  }
  animation = flag;
  console.log('checkAnimation:', animation);
}

function startGame() {
  const canvas = document.getElementById("puzzle15");
  const ctx = canvas.getContext("2d");
  canvas.style.backgroundColor = 'black';
  canvas.style.margin = 10;
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  let quantityClicks = 0;

  shiftCells(50);

  canvas.onclick = (event) => {
    if (animation === true) {
      return;
    }
    let activeIndex = getActiveIndex(event);
    let activeCell = cells[activeIndex];
    let emptyCellIndex = getEmptyCellIndex();
    let emptyCell = cells[emptyCellIndex];
    let emptyCellX = emptyCell.x;
    let emptyCellY = emptyCell.y;
    const moveXLeftAvailable  = ((activeCell.x - CELL_SIZE === emptyCell.x) && (activeCell.y === emptyCell.y));
    const moveXRightAvailable = ((activeCell.x + CELL_SIZE === emptyCell.x) && (activeCell.y === emptyCell.y));
    const moveYUpAvailable    = ((activeCell.y - CELL_SIZE === emptyCell.y) && (activeCell.x === emptyCell.x));
    const moveYDownAvailable  = ((activeCell.y + CELL_SIZE === emptyCell.y) && (activeCell.x === emptyCell.x));
    if (moveXLeftAvailable || moveXRightAvailable || moveYDownAvailable || moveYUpAvailable) {
      determinationMovement(activeCell, emptyCell.x, emptyCell.y);
      animation = true;
      emptyCell.x = activeCell.x;
      emptyCell.y = activeCell.y;
      activeCell.futureX = emptyCellX;
      activeCell.futureY = emptyCellY;
      ++quantityClicks;
    }
  };

  let lastTimestamp = Date.now();

  function gameLoop(ctx, timestamp) {
    const deltaTimestamp = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    checkAnimation(deltaTimestamp);

    //draw model
    drawCell(ctx);
    //check Win
    determinationOfWin(quantityClicks);

    requestAnimationFrame((timestamp)=> {
      gameLoop(ctx, timestamp);
    });
  }

  requestAnimationFrame((timestamp)=> {
    gameLoop(ctx, timestamp);
  });
}

startGame();
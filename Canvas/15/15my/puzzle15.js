const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 480;
const CELL_SIZE = 119;

function createPlate(num, x, y, isEmpty) {
  return {
    isEmpty: isEmpty,
    value: num,
    isSelected: false,
    x: x,
    y: y,
  }
}

function plateCreateHandler(num) {
  let isEmpty = false;
  let x = 0;
  let y = 0;
  if (num === 0) {
    isEmpty = true;
    x = 3;
    y = 3;
  } else if (num > 0 && num < 5) {
    y = 0;
  } else if (num > 4 && num < 9) {
    y = 1;
  }else if (num > 8 && num < 13) {
    y = 2;
  }else if (num > 12 && num < 16) {
    y = 3;
  }
  if ((num === 1) || (num === 9) || (num === 9) || (num === 13)) {
    x = 0;
  } else if ((num === 2) || (num === 6) || (num === 10) || (num === 14)) {
    x = 1;
  } else if ((num === 3) || (num === 7) || (num === 11) || (num === 15)) {
    x = 2;
  } else if ((num === 4) || (num === 8) || (num === 12)) {
    x = 3;
  }
  return createPlate(num, x, y, isEmpty);
}

function getNull() { // функция возвращает координаты пустой клетки(внутри массива)
  for (let row0 = 0; row0 < 4; ++row0) {
    for (let column0 = 0; column0 < 4; ++column0) {
      if (arrayOfNumbers[row0][column0].isEmpty) {
        return{"x0" : arrayOfNumbers[row0][column0].x, "y0" : arrayOfNumbers[row0][column0].y,
                "row0" : row0, "column0" : column0};
      }
    }
  }
}

function getClick(clickX, clickY) { // функция возвращает координаты активной клетки(внутри массива)
  for (let row1 = 0; row1 < 4; ++row1) {
    for (let column1 = 0; column1 < 4; ++column1) {
      if ((clickX === arrayOfNumbers[row1][column1].x) &&
          (clickY === arrayOfNumbers[row1][column1].y)) {
        return {"row1" : row1, "column1" : column1};
      }
    }
  }
}

let arrayOfNumbers = [
    [plateCreateHandler(1), plateCreateHandler(2), plateCreateHandler(3), plateCreateHandler(4)],
    [plateCreateHandler(5), plateCreateHandler(6), plateCreateHandler(7), plateCreateHandler(8)],
    [plateCreateHandler(9), plateCreateHandler(10), plateCreateHandler(11), plateCreateHandler(12)],
    [plateCreateHandler(13), plateCreateHandler(14), plateCreateHandler(15), plateCreateHandler(0)],
];

// canvas.onmousemove = (event) {
// 	const coords = convertToGameFieldCoords(event.layerX, event.layerY);
// 	const plateIndex = convertToPlateIndex(coords.x, coords.y);
//
// 	hideSelection() //выключает выделение у всех элементов
// 	select(plateIndex.row, plateIndex.column); //включает выделение у элемента
// }
//
// requestAnimationFrame( ... )

function drawSquare(ctx) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  for (let row = 0; row < arrayOfNumbers[0].length; ++row) {
    for (let column = 0; column < arrayOfNumbers.length; ++column) {
      if (!arrayOfNumbers[row][column].isEmpty) {
        const sizeOfSquare = 116;
        ctx.fillStyle = "silver";
        ctx.fillRect(3 + arrayOfNumbers[row][column].x * (sizeOfSquare + 3),
            3 + arrayOfNumbers[row][column].y * (sizeOfSquare + 3), sizeOfSquare, sizeOfSquare);
        ctx.font = "italic 40pt Times New Roman";
        ctx.fillStyle = "black";
        const fontWidth = 60;
        const fontForY = 80 + arrayOfNumbers[row][column].y * sizeOfSquare;
        const fontForX1 = 40 + arrayOfNumbers[row][column].x * sizeOfSquare;
        const fontForX2 = 50 + arrayOfNumbers[row][column].x * sizeOfSquare;
        if (arrayOfNumbers[row][column].value >= 10) {
          ctx.fillText('' + arrayOfNumbers[row][column].value, fontForX1, fontForY, fontWidth);
        } else if (arrayOfNumbers[row][column].value <= 10) {
          ctx.fillText('' + arrayOfNumbers[row][column].value, fontForX2, fontForY, fontWidth);
        }
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

  //let lastTimestamp = Date.now();
  canvas.onclick = (event) => {
    let columnClick = Math.floor((event.pageX - 15)/CELL_SIZE);
    let rowClick = Math.floor((event.pageY - 15)/CELL_SIZE);
    let column1 = getClick(columnClick, rowClick).column1;
    let row1 = getClick(columnClick, rowClick).row1;
    let x0 = getNull().x0;
    let y0 = getNull().y0;
    let column0 = getNull().column0;
    let row0 = getNull().row0;
    if (((columnClick - 1 === x0 || columnClick + 1 === x0) && rowClick === y0) || ((rowClick - 1 === y0 || rowClick + 1 === y0) && columnClick === x0)) {
      arrayOfNumbers[row1][column1].x = x0;
      arrayOfNumbers[row1][column1].y = y0;
      arrayOfNumbers[row0][column0].x = columnClick;
      arrayOfNumbers[row0][column0].y = rowClick;
    }
  };

  function gameLoop(ctx) {
    // const delta = timestamp - lastTimestamp;
    // lastTimestamp = timestamp;

    //draw model
    drawSquare(ctx);

    requestAnimationFrame(()=> {
      gameLoop(ctx);
    });
  }
  requestAnimationFrame(()=> {
    gameLoop(ctx);
  });
}

startGame();
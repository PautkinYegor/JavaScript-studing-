let canvas = document.getElementById("puzzle15");
let ctx = canvas.getContext("2d");
canvas.style.backgroundColor = 'black';
canvas.width = 480;
canvas.height = 480;
let cellSize = 119;
let x0 = Math.floor(Math.random() * 4); //x0 and y0 - coordinates of empty cube.
let y0 = Math.floor(Math.random() * 4);
let x = 0;
let y = 0;


// function createPlate(num) {
// 	return {
// 		value: num,
// 		isSelected: false,
// 	}
// }
// let arrayOfNumbers = [
//     [createPlate(1), createPlate(2), createPlate(3), createPlate(4)],
//     [createPlate(5), createPlate(6), createPlate(7), createPlate(8)],
//     [createPlate(9), createPlate(10), createPlate(11), createPlate(12)],
//     [createPlate(13), createPlate(14), createPlate(15), createPlate(0)],
// ];
//
// function convertToGameFieldCoords(x, y) {} //returns {x: ..., y: ...} - относительнеы координаты в игровом поле;
// function convertToPlateIndex(x, y) {} //returns {row: ..., column: ...} - индексы в игровом массиве;
//
// canvas.onclick = (event) {
// 	const coords = convertToGameFieldCoords(event.layerX, event.layerY);
// 	const plateIndex = convertToPlateIndex(coords.x, coords.y);
// 	processMove(plateIndex.row, plateIndex.column);
// }
//
// canvas.onmousemove = (event) {
// 	const coords = convertToGameFieldCoords(event.layerX, event.layerY);
// 	const plateIndex = convertToPlateIndex(coords.x, coords.y);
//
// 	hideSelection() //выключает выделение у всех элементов
// 	select(plateIndex.row, plateIndex.column); //включает выделение у элемента
// }
//
// requestAnimationFrame( ... )

function drawSquare() {
  canvas.onmousemove = (event) => {
    console.log(event.pageX + ':' + event.pageY);
  };
  // let numbers = 1;
  for (y = 0; y < 4; y ++) {
    for (x = 0; x < 4; x ++) {
      if ((x !== x0) || (y !== y0)) {
        const sizeOfSquare = 116;
        ctx.fillStyle = "silver";
        ctx.fillRect(4 + x * (sizeOfSquare + 3), 3 + y * (sizeOfSquare + 3), sizeOfSquare, sizeOfSquare);
        // ctx.fillStyle = "black";
        // ctx.font = "italic 40pt Times New Roman";
        // const fontWidth = 60;
        // const fontForY = 80 + y * sizeOfSquare;
        // const fontForX1 = 40 + x * sizeOfSquare;
        // const fontForX2 = 50 + x * sizeOfSquare;
        // if (numbers >= 10) {
        //   ctx.fillText('' + numbers, fontForX1, fontForY, fontWidth);
        // } else {
        //   ctx.fillText('' + numbers, fontForX2, fontForY, fontWidth);
        // }
        // numbers++;
      }
    }
  }
}

drawSquare();
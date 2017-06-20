let canvas = document.getElementById("puzzle15");
let ctx = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 480;
let cellSize = canvas.width / 4;
let x0 = Math.floor(Math.random() * 4); //x0 and y0 - coordinates of empty cube.
let y0 = Math.floor(Math.random() * 4);
let x = 0;
let y = 0;
let arrayOfNumbers = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]];

function box() {
  ctx.fillStyle = "black";
  ctx.fillRect(1, 1, 480, 480);
}

// function nullCube() {  //возвращает координату пустой клетки
//   for (let x1 = 0; x1 < 4; x1++) {
//     for (let y1 = 0; y1 < 4; y1++) {
//       if (arrayOfNumbers[x1][y1] === 0) {
//         return{"x0":x1,"y0":y1};
//       }
//     }
//   }
// }

function drawCube() {
  let numbers = 1;
  for (y = 0; y < 4; y ++) {
    for (x = 0; x < 4; x ++) {
      if ((x !== x0) || (y !== y0)) {
        ctx.fillStyle = "silver";
        ctx.fillRect(4 + x*119, 4 + y*119, 116, 116);
        ctx.fillStyle = "black";
        ctx.font = "italic 40pt Arial";
        if (numbers >= 10) {
          ctx.fillText(''+numbers, 29 + x*119, 74 + y*119, 66);
        } else {
          ctx.fillText(''+numbers, 49 + x*119, 74 + y*119, 66);
        }
        numbers++;
      }
    }
  }
}

function move(x, y) {
  console.log(x0, y0, x, y);
  if (((x - 1 === x0 || x + 1 === x0) && y === y0) || ((y - 1 === y0 || y + 1 === y0) && x === x0)) {
    let x1 = x;
    let y1 = y;

    //arrayOfNumbers[y][x] = arrayOfNumbers[y0][x0];
    x0 = x1; //координаты пустой клетки стали координатами перемещаемой клетки
    y0 = y1;
    console.log(arrayOfNumbers[y][x]);
    console.log(x0, y0);
  }
}

canvas.onclick = function() {
  let xx = (arrayOfNumbers.pageX - canvas.offsetLeft) / cellSize | 0;  // offsetLeft ?..подумать на счёт этого.(видимо, берёт координаты слева)
  let yy = (arrayOfNumbers.pageY - canvas.offsetTop)  / cellSize | 0;
  move(xx, yy);
  drawCube();
  console.log('click');
};

box();
drawCube();
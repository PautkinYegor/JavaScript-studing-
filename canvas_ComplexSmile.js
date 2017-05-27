function drawEye(startX, startY, revert)
{
  //conturs
  let width = 20;
  startX = revert ? (startX + width) : startX;
  let coef = revert ? -1 : 1;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.fillStyle = 'white'
  ctx.moveTo(startX, startY);
  ctx.bezierCurveTo(startX + 5 * coef, startY - 6, startX + 25 * coef, startY - 1, startX + 40 * coef, startY + 4);
  ctx.moveTo(startX, startY);
  ctx.quadraticCurveTo(startX + 10 * coef, startY + 15, startX + 40 * coef, startY + 4);
  ctx.moveTo(startX + 10 * coef, startY - 3);
  ctx.quadraticCurveTo(startX + 5 * coef, startY + 4, startX + 10 * coef, startY + 7);
  ctx.moveTo(startX + 26 * coef, startY);
  ctx.quadraticCurveTo(startX + 29 * coef, startY + 5, startX + 24 * coef, startY + 8);
  ctx.fill();
  ctx.stroke();
  //pupil
  ctx.beginPath();
  ctx.fillStyle = 'black'
  ctx.arc(startX + 17 * coef, startY + 3, 5, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.stroke();
}

function drawFaceCounturs() {
  ctx.beginPath();
  ctx.fillStyle = 'yellow';
  ctx.arc(x + 45, y + 15, 60, 0 * Math.PI, 2 * Math.PI, false);
  ctx.fill();
  ctx.stroke();
}

function drawMouth() {
  ctx.beginPath();
  ctx.arc(x + 45, y + 15, 40, 2.2 * Math.PI, 0.8 * Math.PI, false);
  ctx.stroke();
}

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let x = 100;
let y = 100;

drawFaceCounturs();
drawEye(x, y, false);
drawEye(x + 70, y, true);
drawMouth();

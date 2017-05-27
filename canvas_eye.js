//eye of lines
//with reverse
function drawEye(startX, startY, revert)
{
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let width = 250;
  startX = revert ? (startX + width) : startX;
  let coef = revert ? -1 : 1;
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.bezierCurveTo(startX + 55 * coef, startY - 30, startX + 155 * coef, startY - 5, startX + 230 * coef, startY + 20);
  ctx.moveTo(startX, startY);
  ctx.quadraticCurveTo(startX + 80 * coef, startY + 75, startX + 230 * coef, startY + 20);
  ctx.moveTo(startX + 80 * coef, startY - 13);
  ctx.quadraticCurveTo(startX + 55 * coef, startY + 20, startX + 80 * coef, startY + 40);
  ctx.moveTo(startX + 160 * coef, startY - 1);
  ctx.quadraticCurveTo(startX + 175 * coef, startY + 25, startX + 150 * coef, startY + 41);
  ctx.stroke();
}

drawEye(30, 85, false);
drawEye(280, 85, true);

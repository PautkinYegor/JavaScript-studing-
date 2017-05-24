//drew straight lines

function createImage()
{
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.lineWidth = 7;
  ctx.moveTo(100, 100);
  ctx.lineTo(30, 200);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.moveTo(100, 100);
  ctx.lineTo(170, 200);
  ctx.lineTo(200, 0);
  ctx.closePath();
  ctx.stroke();
}

createImage();

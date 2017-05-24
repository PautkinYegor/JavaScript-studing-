//eye of lines

function createImage()
{
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(20, 55);
  ctx.bezierCurveTo(75, 25, 175, 50, 250, 75);
  ctx.moveTo(20, 55);
  ctx.quadraticCurveTo(100, 130, 250, 75);
  ctx.moveTo(100, 42);
  ctx.quadraticCurveTo(75, 75, 100, 95);
  ctx.moveTo(180, 54);
  ctx.quadraticCurveTo(195, 80, 170, 96);
  ctx.stroke();
}

createImage();

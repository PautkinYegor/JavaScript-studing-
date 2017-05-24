
function createImage()
{
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  
  ctx.lineWidth = 5;
  ctx.strokeStyle = "blue";
  ctx.beginPath();
  ctx.arc(100, 100, 75, 2.2 * Math.PI, 0.8 * Math.PI, false);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(80, 40);
  ctx.lineTo(80, 120);
  ctx.moveTo(120, 40);
  ctx.lineTo(120, 120);
  ctx.stroke();
}

createImage();

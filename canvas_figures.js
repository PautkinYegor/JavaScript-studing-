let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
ctx.lineWidth = 2;
//first
ctx.beginPath();
ctx.moveTo(20, 55);
ctx.lineTo(20, 95);
ctx.lineTo(60, 95);
ctx.closePath();
ctx.stroke();
//second
ctx.beginPath();
ctx.fillStyle = 'black';
ctx.moveTo(30, 55);
ctx.lineTo(70, 95);
ctx.lineTo(70, 55);
ctx.closePath();
ctx.fill();
ctx.stroke();

    //figure
//first part
ctx.beginPath();
ctx.moveTo(150, 80);
ctx.lineTo(175, 130);
ctx.lineTo(200, 80);
ctx.lineTo(175, 30);
ctx.closePath();
ctx.lineTo(200, 80);
ctx.stroke();
//second part
ctx.beginPath();
ctx.moveTo(175, 55);
ctx.lineTo(125, 80);
ctx.lineTo(175, 105);
ctx.lineTo(225, 80);
ctx.closePath();
ctx.lineTo(175, 105);
ctx.stroke();

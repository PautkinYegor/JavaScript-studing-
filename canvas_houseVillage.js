// USE:
// <canvas id="canvas" style="background: deepskyblue" width="700" height="500"> </canvas>
let canvas = document.getElementById("canvas");
canvas.style.backgroundColor = 'deepskyblue';
let ctx = canvas.getContext("2d");


function wall_main() {
  ctx.beginPath();
  ctx.fillStyle = '#95641e';
  ctx.lineWidth = 2;
  ctx.moveTo(30, 365);
  ctx.lineTo(210, 365);
  ctx.lineTo(210, 265);
  ctx.lineTo(30, 265);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function wall_second() {
  ctx.beginPath();
  ctx.fillStyle = '#95641e';
  ctx.lineWidth = 2;
  ctx.moveTo(210, 365);
  ctx.lineTo(280, 363);
  ctx.lineTo(280, 255);
  ctx.lineTo(210, 265);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function door() {
  ctx.beginPath();
  ctx.fillStyle = '#939583';
  ctx.lineWidth = 2;
  ctx.moveTo(230, 365);
  ctx.lineTo(260, 360);
  ctx.lineTo(260, 290);
  ctx.lineTo(230, 295);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function draw_window() {
  ctx.beginPath();
  ctx.fillStyle = '#0d79d1';
  ctx.lineWidth = 2;
  ctx.moveTo(90, 335);
  ctx.lineTo(150, 335);
  ctx.lineTo(150, 295);
  ctx.lineTo(90, 295);
  ctx.closePath();
  ctx.moveTo(130, 335); //frame ->
  ctx.lineTo(130, 295);
  ctx.moveTo(130, 310);
  ctx.lineTo(150, 310);
  ctx.fill();
  ctx.stroke();
}

function meadow() {
  ctx.beginPath();
  ctx.fillStyle = 'green';
  ctx.moveTo(0, 350);
  ctx.lineTo(0, 500);
  ctx.lineTo(600, 500);
  ctx.quadraticCurveTo(500, 348, 0, 350);
  ctx.fill();
  ctx.stroke();
}

function attic() {
  ctx.beginPath();
  ctx.fillStyle = '#d18534';
  ctx.moveTo(245, 205);
  ctx.lineTo(280, 255);
  ctx.lineTo(210, 265);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function pipe() {
  ctx.beginPath();
  ctx.fillStyle = '#a04f1f'
  ctx.moveTo(140, 210);
  ctx.lineTo(160, 210);
  ctx.lineTo(160, 180);
  ctx.lineTo(140, 180);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function roof() {
  ctx.beginPath();
  ctx.fillStyle = '#D14119';
  ctx.moveTo(245, 205);
  ctx.lineTo(65, 205);
  ctx.lineTo(30, 265);
  ctx.lineTo(210, 265);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function clouds() {
  ctx.beginPath();   //first_cloud
  ctx.lineWidth = 0.001;
  ctx.fillStyle = 'white';
  ctx.arc(420, 105, 40, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();   //second_cloud
  ctx.lineWidth = 0.001;
  ctx.fillStyle = 'white';
  ctx.arc(530, 105, 40, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();   //third_cloud
  ctx.lineWidth = 0.001;
  ctx.fillStyle = 'white';
  ctx.arc(480, 70, 40, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();   //fourth_cloud
  ctx.lineWidth = 0.001;
  ctx.fillStyle = 'white';
  ctx.arc(480, 110, 40, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}

function draw_house() {
  wall_main();
  wall_second();
  door();
  draw_window();
  meadow();
  attic();
  pipe();
  roof();
  clouds();
}

draw_house();

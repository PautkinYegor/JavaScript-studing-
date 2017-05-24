function createImage() 
{ 
  let canvas = document.getElementById("canvas"); 
  let ctx = canvas.getContext("2d"); 
  ctx.strokeRect(20, 20, 50, 50); 
  ctx.fillRect(80, 80, 50, 50); 
  ctx.clearRect(50, 50, 50, 50); 
} 

createImage();

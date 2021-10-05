let x_circle = 200;
let y_circle = 200;
let x_vel = 2;
let y_vel = 1.5;
let diametro = 50;
let raio = diametro/2;

function setup() {
  createCanvas(320, 300);
  noStroke();
  rectMode(CENTER);
}

function draw() {
  background(200);
  x_circle += x_vel;
  y_circle += y_vel;
  if(x_circle + raio > width){
    x_vel *= -1;
    fill(random(255), random(255), random(255));
  }
  if(y_circle + raio > height){
    y_vel *= -1;
    fill(random(255), random(255), random(255));
  }
  if(y_circle - raio < 0){
     y_vel *= -1;
     fill(random(255), random(255), random(255));
  }
  if(x_circle - raio < 0){
    x_vel *= -1;
    fill(random(255), random(255), random(255));
  }

  circle(x_circle, y_circle, 50);
}
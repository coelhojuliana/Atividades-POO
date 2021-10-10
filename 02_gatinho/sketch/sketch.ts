class Entidade{
  x: number;
  y: number;
  step: number;
  img: p5.Image;
  constructor(x: number, y: number, step: number, img: p5.Image){
    this.x = x;
    this.y = y;
    this.step = step;
    this.img = img;
  }

  draw(){
    image(this.img, this.x * this.step, this.y * this.step, this.step, this.step)
  }
}

class Board{
  nl: number;
  nc: number;
  step: number;
  background: p5.Image;

  constructor(nl: number, nc: number, step: number, background: p5.Image){
    this.nl = nl;
    this.nc = nc;
    this.step = step;
    this.background = background;
  }
  
  draw(): void {
    image(this.background, 0, 0, this.nl * this.step, this.nc * this.step);
    for (let x = 0; x < this.nc; x++){
      for (let y = 0; y < this.nl; y++){
        noFill();
        stroke(0);
        strokeWeight(2);
        rect(x*this.step, y*this.step, this.step, this.step);
      }
    }
  }
}

let img: p5.Image;
let img_left: p5.Image;
let food_img: p5.Image;
let board_img: p5.Image;
let gatito: Entidade;
let food: Entidade;
let board: Board;
let food_cont = 0;


function loadImg(path: string): p5.Image {
  return loadImage(
    path,
    () => console.log("Loading " + path + " ok"),
    () => console.log("Loading " + path + " failed")
  )
}


function preload(){
  img = loadImg('../sketch/img/gatito.png');
  img_left = loadImg('../sketch/img/gatito_left.png');
  food_img = loadImg('../sketch/img/food.png');
  board_img = loadImg('../sketch/img/back-spa.jpg');
  
}

function keyPressed(){
  if(keyCode === LEFT_ARROW){
    gatito.x--;
    gatito.img = img_left;
  } else if(keyCode === RIGHT_ARROW){
    gatito.x++;
    gatito.img = img;
  } else if(keyCode === UP_ARROW){
    gatito.y--;
  } else if(keyCode === DOWN_ARROW){
    gatito.y++;
  }

  if(keyCode === "A".charCodeAt(0)){
    food.x--;
  } else if(keyCode === "D".charCodeAt(0)){
    food.x++;
  } else if(keyCode === "W".charCodeAt(0)){
    food.y--;
  } else if(keyCode === "S".charCodeAt(0)){
    food.y++;
  }
}

function setup() {
  let size = 100;
  gatito = new Entidade(0, 0, size, img);
  food = new Entidade(5, 5, size, food_img);
  board = new Board(6, 6, size, board_img);
  createCanvas(board.nc * size, board.nl * size);
}

function food_loop(){
  if(food.x == board.nc){
    food.x = 0;
  } else if(food.y == board.nl){
    food.y = 0;
  } else if(food.x < 0){
    food.x = board.nc - 1;
  } else if(food.y < 0){
    food.y = board.nl -1;
  }
}

function gatito_board(){
  if(gatito.x == board.nc){
    gatito.x = gatito.x - 2;
  } else if(gatito.y == board.nl){
    gatito.y = gatito.y -2;
  } else if(gatito.x < 0){
    gatito.x = gatito.x + 2;
  } else if(gatito.y < 0){
    gatito.y = gatito.y + 2;
  }
}

function mostrar_contagem(){
  fill("white");
  textSize(30)
  text("Gatito: " + food_cont, 250, 38);
}

function comer(){
  if(gatito.x == food.x && gatito.y == food.y){
    food_cont += 1;
    gatito.x = 0;
    gatito.y = 0;
    food.x = 5;
    food.y = 5;
  }
}

function draw() {
  board.draw();
  food.draw();
  gatito.draw();
  food_loop();
  gatito_board();
  comer();
  mostrar_contagem();
}
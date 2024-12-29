//board
var blockSize = 20;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

//food

var foodX;
var foodY;

//direction of snake

var velocityX = 0;
var velocityY = 0;

//snake body

var snakebody = [];

//game over variable

var gameover = false;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection);
  //   update();
  setInterval(update, 1000 / 10);
};

function update() {
  if (gameover) {
    return;
  }
  context.fillStyle = "black";
  context.fillRect(0, 0, board.width, board.height);

  context.fillStyle = "blue";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakebody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakebody.length - 1; i > 0; i--) {
    snakebody[i] = snakebody[i - 1];
  }

  if (snakebody.length) {
    snakebody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "lime";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakebody.length; i++) {
    context.fillRect(snakebody[i][0], snakebody[i][1], blockSize, blockSize);
  }

  //game over conditions

  //for touching border of box
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX == cols * blockSize ||
    snakeY == rows * blockSize
  ) {
    gameover = true;
    alert("GAME OVER");
  }

  //for touching own body
  for (let i = 0; i < snakebody.length - 1; i++) {
    if (snakeX == snakebody[i][0] && snakeY == snakebody[i][1]) {
      gameover = true;
      alert("Game over");
    }
  }
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

function placeFood() {
  //random generates a no between 0-1
  //we multiply it by no of cols
  //then we take rounded of value of above using floor
  //that is then multiplied with blockSize to fill one block properly.
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

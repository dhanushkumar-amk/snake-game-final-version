const playBoard = document.querySelector('.play-board');
const scoreElement = document.querySelector('.score');
const highScoreElement = document.querySelector('.high-score');
const controls = document.querySelectorAll('.controls i');

let foodX, foodY;
let snakeX = 5,
  snakeY = 10;
let velocityX = 0,
  velocityY = 0;
let snakeBody = [];
let gameOver = false;
let setIntervalid;
let score = 0;

let highScore = localStorage.getItem('high-score') || 0;
highScoreElement.innerText = `High Score : ${highScore}`;

const changeFoodPosition = () => {
  //passing a random 0 - 30 values randomly
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};
const handleGameOver = () => {
  clearInterval(setIntervalid);
  alert('Game Over! Press Ok To Replay the Game again'); // if game is over ,the system alert the user "the game is over"
  location.reload(); // the user press "OK" the game is reloaded to the new game
};

const changeDirection = (e) => {
  //                                                          console.log(e);
  if (e.key === 'ArrowUp' && velocityY != 1) {
    // velocity !=1/!=-1 its means the snake go only one direction no parallel direction
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === 'ArrowDown' && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === 'ArrowLeft' && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === 'ArrowRight' && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
  initGame();
};

controls.forEach((key) => {
  //for smaller screen controls
  key.addEventListener('click', () =>
    changeDirection({ key: key.dataset.key })
  );
});

const initGame = () => {
  if (gameOver) return handleGameOver();
  let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

  if (snakeX === foodX && snakeY === foodY) {
    //if food and head meets together the position of the food is changed
    changeFoodPosition();
    snakeBody.push([foodX, foodY]); // pushing food into the snake body
    // console.log(snakeBody);
    score++; // score incremented by 1

    scoreElement.innerHTML = `Score : ${score}`;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem('high-score', highScore);
    highScoreElement.innerText = `High Score : ${highScore}`;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1]; // shifting the values to snake body by one
  }

  snakeBody[0] = [snakeX, snakeY]; // setting the first element snake position set

  //   updating the snake head position based on the velocity
  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    // console.log('game Over!'); // if the snake hits the wall or border the statement game over is  comes up true
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    // adding the food to the snake head
    htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    // if the snake heads hits the body rhe gameover became true

    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }

  playBoard.innerHTML = htmlMarkup;
};
changeFoodPosition();
setIntervalid = setInterval(initGame, 125); // Now the head will move every 125 millisecond
//  125 is the speed of the snake 1000         =>  [millisecond = 1s]
initGame();

document.addEventListener('keydown', changeDirection);

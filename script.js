const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let snake = [{ x: 200, y: 200 }];
let dx = 10;
let dy = 0;
let food = { x: 0, y: 0 };

function drawSnake() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "black";
snake.forEach((part) => {
ctx.fillRect(part.x, part.y, 10, 10);
});
}

function moveSnake() {
const head = { x: snake[0].x + dx, y: snake[0].y + dy };
snake.unshift(head);
if (head.x === food.x && head.y === food.y) {
generateFood();
} else {
snake.pop();
}
}

function generateFood() {
food.x = Math.floor(Math.random() * 39) * 10;
food.y = Math.floor(Math.random() * 39) * 10;
}

function drawFood() {
ctx.fillStyle = "red";
ctx.fillRect(food.x, food.y, 15, 15);
}

function checkCollision() {
if (
snake[0].x < 0 ||
snake[0].x > canvas.width - 10 ||
snake[0].y < 0 ||
snake[0].y > canvas.height - 10
) {
clearInterval(game);
alert("Game Over!");
}
for (let i = 10; i < snake.length; i++) {
if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
    clearInterval(game);
    alert("Game Over!");
}
}
}

function gameLoop() {
moveSnake();
drawSnake();
drawFood();
checkCollision();
}
generateFood();
const game = setInterval(gameLoop, 100);
document.addEventListener("keydown", (event) => {
if (event.code === "ArrowLeft") {
dx = -10;
dy = 0;
} else if (event.code === "ArrowRight") {
dx = 10;
dy = 0;
} else if (event.code === "ArrowUp") {
dx = 0;
dy = -10;
} else if (event.code === "ArrowDown") {
dx = 0;
dy = 10;
}
});
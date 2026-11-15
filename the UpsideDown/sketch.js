await Canvas();
world.gravity.y = 10;
world.height = 400;
let ball = new Sprite();
ball.diameter = 50;
ball.color = 'orange';
// Box2D puts resting bodies to sleep, which freezes the ball on the tightrope
// and ignores gravity flips; keep it awake.
ball.allowSleeping = false;
ball.x = 0;
ball.y = -100;

let groundA = new Sprite();
let changeVer = 5;
const pressedKeys = new Set();
groundA.x = 0;
groundA.width = screen.width;
groundA.physics = STATIC;
groundA.y = 400;
groundA.height = 50;
groundA.color = 'brown';

let tightropeA = new Sprite();
tightropeA.x = 0;
tightropeA.width = screen.width;
tightropeA.physics = STATIC;
tightropeA.y = 0;
tightropeA.height = 10;
tightropeA.color = 'black';

let ceilingA = new Sprite();
ceilingA.x = 0;
ceilingA.width = screen.width;
ceilingA.physics = STATIC;
ceilingA.y = -400;
ceilingA.height = 50;
ceilingA.color = 'white';

window.addEventListener('keydown', (event) => {
	if (event.key.startsWith('Arrow')) event.preventDefault();
	pressedKeys.add(event.key);
});

window.addEventListener('keyup', (event) => {
	pressedKeys.delete(event.key);
});

let downWasPressed = false;
let upWasPressed = false;
q5.update = function () {
	if (gameOver) return;
	const downPressed = pressedKeys.has('ArrowDown');
	// flip only on the frame the key goes down, while touching the ground
	if (downPressed && !downWasPressed && ball.colliding(tightropeA)) {
		ball.y *= -1;
		world.gravity.y = -world.gravity.y;
	}
	downWasPressed = downPressed;
	
};
let timer = 0;
let obstacle = new Sprite();
obstacle.width = 50;
obstacle.height = 50;
obstacle.physics = STATIC;
obstacle.color = 'red';
obstacle.x = -325;
obstacle.y = -1000;
// let the ball pass through the obstacle so we can detect the hit ourselves
ball.overlaps(obstacle);
let gameOver = false;
q5.draw = function () {
	if (gameOver) {
		background('red');
		fill('white');
		textSize(32);
		textAlign(CENTER, CENTER);
		text('game over', 0, 0);
		return;
	}
	background('skyblue');
	text('use the arrow keys to move', 0, -50);
	ball.vel.x = (pressedKeys.has('ArrowRight') ? 5 : 0) - (pressedKeys.has('ArrowLeft') ? 5 : 0);
	if (pressedKeys.has('ArrowUp')) ball.vel.y = -changeVer;
	if (pressedKeys.has('ArrowDown')) ball.vel.y = changeVer;
	// every 5 seconds, replace the old obstacle with a new one above or below the ball
	if (frameCount % 60 === 0) {
		timer++;
		if (timer % 5 === 0) {
			q5.moveObstacle('up');
		}else if (timer % 2 === 0) {
			q5.moveObstacle('down');
		}
	}
	if (obstacle.x > screen.width) {
		obstacle.x = -325;
		if (ball.y <= 0) {
			q5.moveObstacle('up');
		}else if (ball.y >= 0) {
			q5.moveObstacle('down');
		}
	}
	obstacle.x+=1;
	q5.gameOver();
};
q5.moveObstacle = function (upDown) {
	obstacle.y = upDown === 'up' ? ball.y - 25 : ball.y + 25;
};
q5.caught = function () {
	// handle the ball being caught by the obstacle
	return ball.overlapping(obstacle) > 0;
};
q5.gameOver = function () {
	// handle the ball being caught, e.g., reset the ball or trigger a game over
		if (q5.caught()) {
			gameOver = true;
			// change the background right away, in the same frame as the hit
			background('red');
			fill('white');
			textSize(32);
			textAlign(CENTER, CENTER);
			text('game over', 0, 0);
			ball.remove();
			obstacle.remove();
			tightropeA.remove();
			ceilingA.remove();
			groundA.remove();
			return;
	}
};


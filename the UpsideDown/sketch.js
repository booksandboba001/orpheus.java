await Canvas();
world.gravity.y = 10;
world.height = 400;
world.color = 'skyblue';
imageMode(CORNER);

let timer = 0;
let gameover = false;
let life = 3;
let hitCooldown = 0;
let canJump = false;

let obstacle = new Sprite();
obstacle.img = 'assets/stranger-things.png';
obstacle.width = 50;
obstacle.height = 50;
// KINEMATIC lets the obstacle move smoothly and keep its collision hitbox synced
obstacle.physics = KINEMATIC;
obstacle.color = 'red';
obstacle.x = -325;
obstacle.y = -25;

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
ceilingA.color = 'transparent';
ceilingA.stroke = 'transparent';

let heart1 = new Sprite(-width / 2 + 100, -height / 2 + 25, 50, 50);
heart1.img = 'assets/heart1.png';
heart1.img.scale = 0.5;
heart1.physics = STATIC;
heart1.overlaps(ceilingA);

let heart2 = new Sprite(-width / 2 + 100, -height / 2 + 25, 50, 50);
heart2.img = 'assets/heart2.png';
heart2.img.scale = 0.5;
heart2.physics = STATIC;
heart2.overlaps(ceilingA);

let heart3 = new Sprite(-width / 2 + 100, -height / 2 + 25, 50, 50);
heart3.img = 'assets/heart3.png';
heart3.img.scale = 0.5;
heart3.physics = STATIC;
heart3.overlaps(ceilingA);

// let the ball pass through the obstacle so we can detect the hit ourselves
ball.overlaps(obstacle);

q5.update = function () {
  if (gameover) return;

  // flip only on the frame the key goes down, while touching the tightrope
  if (kb.presses('down') && ball.colliding(tightropeA)) {
    ball.y *= -1;
    world.gravity.y = -world.gravity.y;
  }
};

q5.draw = function () {
  if (gameover) {
    background('red');
    fill('white');
    textSize(32);
    textAlign(CENTER, CENTER);
    text('game over', 0, 0);
    noLoop();
    return;
  }

  background('skyblue');
  fill('black');
  textAlign(CENTER, CENTER);
  text('use the arrow keys to move', 0, -50);

  // Horizontal movement
  ball.vel.x = (kb.pressing('right') ? 5 : 0) - (kb.pressing('left') ? 5 : 0);

  // Reset jump ability whenever touching the tightrope or ground
  if (ball.colliding(tightropeA) || ball.colliding(groundA)) {
    canJump = true;
  }

  // Only allow jumping once until landing again
  if (kb.pressing('up') && canJump) {
    ball.vel.y = world.gravity.y > 0 ? -changeVer * 2 : changeVer * 2;
    canJump = false;
  }

  if (kb.pressing('down')) ball.vel.y = changeVer;

  // every 5 seconds, replace the old obstacle with a new one above or below the ball
  if (frameCount % 60 === 0) {
    timer++;
    if (timer % 5 === 0) {
      moveObstacle('up');
    } else if (timer % 2 === 0) {
      moveObstacle('down');
    }
  }

  if (obstacle.x > width / 2 + 50) {
    obstacle.x = -width / 2 - 50;
    if (ball.y <= 0) {
      moveObstacle('up');
    } else if (ball.y >= 0) {
      moveObstacle('down');
    }
  }

  // Use vel.x instead of obstacle.x += 1 so collision detection always fires
  obstacle.vel.x = 2;

  gameOver();
  drawHearts();
};

function drawHearts() {
  if (life === 3) {
    heart1.visible = false;
    heart2.visible = false;
    heart3.visible = true;
  } else if (life === 2) {
    heart1.visible = false;
    heart2.visible = true;
    heart3.visible = false;
  } else if (life === 1) {
    heart1.visible = true;
    heart2.visible = false;
    heart3.visible = false;
  } else if (life <= 0) {
    heart1.visible = false;
    heart2.visible = false;
    heart3.visible = false;
  }
}

function moveObstacle(upDown) {
  obstacle.y = upDown === 'up' ? ball.y - 25 : ball.y + 25;
}

function caught() {
  if (hitCooldown > 0) {
    hitCooldown--;
    return false;
  }

  if (ball.overlapping(obstacle) > 0) {
    life -= 1;
    hitCooldown = 60;
    return true;
  }

  return false;
}

function gameOver() {
  if (caught() && life <= 0) {
    gameover = true;
    allSprites.deleteAll();
  }
}

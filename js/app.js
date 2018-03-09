// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};
// Variable declaration
var score;
var deaths;

// Calls the reset function
$('#reset').on('click', function() {
  reset();
});

// Resets the game
function reset() {
  score = 0;
  deaths = 0;
  this.startPos();
  void(document.getElementById('deaths').innerHTML = 'DEATHS: ' + deaths);
  void(document.getElementById('score').innerHTML = 'SCORE: ' + score);
}

// Creates array allEnemies and initializes it
// Then adds all the enemy objects to the array with coordinates as well as speed
var allEnemies = [];
for (i = 0; i < 6; i++) {
  allEnemies.push(new Enemy());
  allEnemies[i].x = -100;
  allEnemies[i].width = 70;
  allEnemies[i].height = 65;
  allEnemies[i].speed = ((Math.random() * 300) + 100);
  if (allEnemies.length < 3) {
    allEnemies[i].y = 60;
  } else if (allEnemies.length > 2 && allEnemies.length < 5) {
    allEnemies[i].y = 145;
  } else {
    allEnemies[i].y = 230;
  }
}

// Checks if the player and the enemy have collided
function checkCollision() {

}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  // Checks if the enemy has gone out the board area, if so, enemy is placed
  // at the beginning
  for (i = 0; i < 6; i++) {
    if (allEnemies[i].x > 500) {
      allEnemies[i].x = -100;
    }
  }

  // Moves the enemies across the board
  var enemyNum = Math.floor(Math.random() * 6);
  var enemyObj = allEnemies[enemyNum];
  if (enemyObj.x > -100) {
    enemyObj.x += enemyObj.speed * dt;
  } else {
    setTimeout(function() {
      enemyObj.x += 1;
    }, Math.random() * 100000);
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.startPos();
  this.width = 65;
  this.height = 76;
  score = 0;
  deaths = 0;
};

Player.prototype.checkCollision = function() {
  for (i = 0; i < 6; i++) {
    if (this.x < allEnemies[i].x + allEnemies[i].width && this.x + this.width > allEnemies[i].x &&
      this.y < allEnemies[i].y + allEnemies[i].height && this.y + this.height > allEnemies[i].y) {
      this.startPos();
      alert('You died!');
      deaths += 1;
      void(document.getElementById('deaths').innerHTML = 'DEATHS: ' + deaths);
      break;
    }
  }
};

Player.prototype.checkWin = function() {
  if (this.y === -32) {
    this.startPos();
    alert('You win!');
    score += 1;
    void(document.getElementById('score').innerHTML = 'SCORE: ' + score);
  }
};

// Update function for player
Player.prototype.update = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  this.checkCollision();
  this.checkWin();
};

// Renders the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.startPos = function() {
  this.x = 200;
  this.y = 300;
};

// Handles the input for the player and moves the player accordingly
Player.prototype.handleInput = function(direction) {
  if (direction === 'up' && this.y !== -32) {
    this.y -= 83;

  } else if (direction === 'down' && this.y !== 383) {
    this.y += 83;

  } else if (direction === 'left' && this.x !== -2) {
    this.x -= 101;

  } else if (direction === 'right' && this.x !== 402) {
    this.x += 101;

  }
};

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
setTimeout(function() {
  document.addEventListener('keyup', function(e) {
    var allowedKeys = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
  });
}, 2000);

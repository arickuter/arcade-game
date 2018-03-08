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
  this.x = 200;
  this.y = 300;
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
  this.x = 200;
  this.y = 300;
  this.width = 65;
  this.height = 76;
  score = 0;
  deaths = 0;
};

Player.prototype.checkCollision = function() {
  for (i = 0; i < 6; i++) {
    if (player.x < allEnemies[i].x + allEnemies[i].width && player.x + player.width > allEnemies[i].x &&
      player.y < allEnemies[i].y + allEnemies[i].height && player.y + player.height > allEnemies[i].y) {
      player.x = 200;
      player.y = 300;
      alert('You died!');
      deaths += 1;
      void(document.getElementById('deaths').innerHTML = 'DEATHS: ' + deaths);
      break;
    }
  }
};

// Update function for player
Player.prototype.update = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  this.checkCollision();
  if (this.y === -20) {
    setTimeout(function() {
      alert('You win!');
      score += 1;
      void(document.getElementById('score').innerHTML = 'SCORE: ' + score);
      this.x = 200;
      this.y = 300;
    }, 10);
  }
};

// Renders the player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handles the input for the player and moves the player accordingly
Player.prototype.handleInput = function(direction) {
  if (direction === 'up' && this.y !== -20) {
    this.y -= 80;

  } else if (direction === 'down' && this.y !== 380) {
    this.y += 80;

  } else if (direction === 'left' && this.x !== 0) {
    this.x -= 100;

  } else if (direction === 'right' && this.x !== 400) {
    this.x += 100;

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

(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx, bulletImage, shipImage, images, bg)   {
    this.ctx = ctx;
    this.images = images;
    this.asteroids = [];
    this.bg = bg;
    this.ship = new Asteroids.Ship(shipImage, bulletImage);
    this.bullets = [];
    this.counter = 0;

    for (var i = 0; i < Game.NUM_STROIDS; i++) {
      this.asteroids.push(
        Asteroids.randomAsteroid(Game.DIM_X, Game.DIM_Y, images, this.ship.pos)
      );
    }
  };

  Game.NUM_STROIDS = 10;
  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.FPS = 24;

  Game.prototype.bgFill = function () {
    var bg = this.bg;
    var width = bg.width;
    var height = bg.height;
    var tileX = Game.DIM_X / width;
    var tileY = Game.DIM_Y / height;

    for (var i = 0; i < tileX; i++) {
      for (var j = 0; j < tileY; j++) {
        this.ctx.drawImage(bg, i * width, j * height);
      }
    }
  };

  Game.prototype.textSettings = function() {
      this.ctx.fillStyle = "white";
      this.ctx.font = "16px 'KenVector Future'";
  }

  Game.prototype.drawScore = function () {
    var scoreString = this.counter.toString();
    while (scoreString.length < 10) {
      scoreString = "0" + scoreString;
    }

    this.ctx.fillText(scoreString, Game.DIM_X - this.ctx.measureText(scoreString).width - 10, 26);
  };

  Game.prototype.drawGameOver = function () {
    this.ctx.fillText("GAME OVER", Game.DIM_X / 2, Game.DIM_Y / 2);
  };

  Game.prototype.draw = function () {
    var ctx = this.ctx;
    this.textSettings();

    this.bgFill();

    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(ctx);
    });

    this.bullets.forEach(function(bullet) {
      bullet.draw(ctx);
    });
    this.ship.draw(ctx);

    this.drawScore();
  };

  Game.prototype.outOfBounds = function (object) {
    return (object.pos[0] >= Game.DIM_X ||
            object.pos[1] >= Game.DIM_Y ||
            object.pos[0] <= 0 ||
            object.pos[1] <= 0);
  };

  Game.prototype.removeAsteroid = function (asteroid) {
    this.asteroids = _.without(this.asteroids, asteroid);
  };

  Game.prototype.move = function () {
    var game = this;

    this.asteroids.forEach(function(asteroid) {
      asteroid.move();

      if (game.outOfBounds(asteroid)) {
        game.removeAsteroid(asteroid);
      }
    });

    this.bullets.forEach(function(bullet) {
      bullet.move();

      if (game.outOfBounds(bullet)) {
        game.bullets = _.without(game.bullets, bullet);
      }
    });

    this.ship.move();
  };

  Game.prototype.step = function () {
    var key = root.key;
    if (key.isPressed("w")) {
      this.ship.power(0.1);
    } else if (key.isPressed("s")) {
      this.ship.power(-0.1);
    }

    if (key.isPressed("a")) {
      this.ship.turn(-0.1);
    } else if (key.isPressed("d")) {
      this.ship.turn(0.1);
    }

    this.move();
    this.draw();
    this.checkCollisions();
  };

  Game.prototype.start = function () {
    key('n', this.fire.bind(this));
    this.intervalID = setInterval(this.step.bind(this), 1000 / Game.FPS)
  };

  Game.prototype.checkCollisions = function () {
    var game = this;
    var hitAsteroids = [];
    var hitBullets = [];

    this.asteroids.forEach(function(asteroid) {
      if (game.ship.isCollidedWith(asteroid)) {
        game.stop();
      }

      game.bullets.forEach(function(bullet) {
        if (asteroid.isCollidedWith(bullet)) {
          hitAsteroids.push(asteroid);
          hitBullets.push(bullet);
          game.counter += 1;
        }
      })
    });

    hitAsteroids.forEach(function(asteroid) {
      var newAsteroids = asteroid.split();
      game.asteroids.push.apply(game.asteroids, newAsteroids);

      game.removeAsteroid(asteroid);
    });

    game.bullets = _.difference(game.bullets, hitBullets);
  };

  Game.prototype.spawn = function () {
    this.asteroids.push(Asteroids.randomAsteroid(Game.DIM_X, Game.DIM_Y, this.images, this.ship.pos));
  };

  Game.prototype.stop = function () {
    clearInterval(this.intervalID);
    this.drawGameOver();
  };

  Game.prototype.fire = function () {
    var bullet = this.ship.fire();
    
    if (bullet) { 
      this.bullets.push(bullet);
    }
  };
})(this);

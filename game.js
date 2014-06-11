(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx, bulletImage, shipImage, images, bg) {
    this.ctx = ctx;
    this.images = images;
    this.asteroids = [];
    this.bg = bg;
    this.ship = new Asteroids.Ship(shipImage, bulletImage);
    this.bullets = [];
    this.counter = 0;

    for (var i = 0; i < Game.NUM_STROIDS; i++) {
      this.asteroids.push(
        Asteroids.randomAsteroid(Game.DIM_X, Game.DIM_Y, images)
      );
    }

    ctx.translate(-100, -100)
  };

  Game.NUM_STROIDS = 5;
  Game.DIM_X = 700;
  Game.DIM_Y = 700;
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

  Game.prototype.drawText = function() {
      this.ctx.fillStyle = "white";
      this.ctx.font = "24pt Helvetica";
      this.ctx.fillText("Score: " + this.counter, 200, 150);
  }

  Game.prototype.draw = function () {
    var ctx = this.ctx;

    this.bgFill();

    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(ctx);
    });

    this.bullets.forEach(function(bullet) {
      bullet.draw(ctx);
    });
    this.ship.draw(ctx);

    this.drawText();
  };

  Game.prototype.outOfBounds = function (object) {
    return (object.pos[0] >= Game.DIM_X - object.speed ||
            object.pos[1] >= Game.DIM_Y - object.speed);
  };

  Game.prototype.move = function () {
    var game = this;

    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });

    this.bullets.forEach(function(bullet) {
      bullet.move();
      if (game.outOfBounds(bullet)) {
      game.bullets =  _.without(game.bullets, bullet);
      }
    });

    this.ship.move();
  };

  Game.prototype.step = function () {
    var key = root.key;
    // if (key.isPressed("up")) {
//       this.ship.power(2);
//     } else if (key.isPressed("down")) {
//       this.ship.power(-1);
//     }

    if (key.isPressed("left")) {
      this.ship.turn(-0.1);
    } else if (key.isPressed("right")) {
      this.ship.turn(0.1);
    }

    if (key.isPressed("space")) {
      this.fire();
    }

    this.move();
    this.draw();
    this.checkCollisions();
  };

  Game.prototype.start = function () {
    this.intervalID = setInterval(this.step.bind(this), 1000 / Game.FPS)
  };

  Game.prototype.checkCollisions = function () {
    var game = this;

    this.asteroids.forEach(function(asteroid) {
      if (game.ship.isCollidedWith(asteroid)) {
        game.stop();
      }

      game.bullets.forEach(function(bullet) {
        if (asteroid.isCollidedWith(bullet)) {
          game.bullets = _.without(game.bullets, bullet);
          game.asteroids = _.without(game.asteroids, asteroid);
          game.counter += 1;
          game.spawn();
        }
      })
    });
  };

  Game.prototype.spawn = function () {
    this.asteroids.push(Asteroids.randomAsteroid(Game.DIM_X, Game.DIM_Y, this.images));
  };

  Game.prototype.stop = function () {
    clearInterval(this.intervalID);
  };

  Game.prototype.fire = function () {
    this.bullets.push(this.ship.fire());
  };
})(this);
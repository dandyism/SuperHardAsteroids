(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx, images, bg) {
    this.ctx = ctx;
    this.images = images;
    this.asteroids = [];
    this.bg = bg;

    for (var i = 0; i < Game.NUM_STROIDS; i++) {
      this.asteroids.push(
        Asteroids.randomAsteroid(Game.DIM_X, Game.DIM_Y, images)
      );
    }
  };

  Game.NUM_STROIDS = 10;
  Game.DIM_X = 500;
  Game.DIM_Y = 500;

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

  Game.prototype.draw = function () {
    var ctx = this.ctx;

    this.bgFill();

    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.move = function () {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });
  };

  Game.prototype.step = function () {
    this.move();
    this.draw();
  };
})(this);
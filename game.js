(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  Game.NUM_STROIDS = 10;
  Game.DIM_X = 500;
  Game.DIM_Y = 500;

  var Game = Asteroids.Game = function(ctx, images, bg) {
    this.ctx = ctx;
    this.images = images;
    this.asteroids = [];
    this.bg = bg;

    for (var i = 0; i < Game.NUM_STROIDS; i++) {
      this.asteroids.push(Asteroids.randomAsteroid(Game.DIM_X, Game.DIM_Y, images));
    }
  };
})(this);
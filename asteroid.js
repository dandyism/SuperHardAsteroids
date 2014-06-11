(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, angle, speed, image) {
    Asteroids.MovingObject.call(this, pos, angle, speed, image);
  }

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroids.Asteroid.MAX_SPEED = 10;

  Asteroids.randomAsteroid = function (dimX, dimY, images) {
    var numImages = images.length;
    var index = Math.floor(Math.random() * numImages);
    var x = Math.floor(Math.random() + 0.5) * dimX;
    var y = Math.floor(Math.random() +0.5) * dimY;
    var angle = Math.floor(Math.random() * 2 * Math.PI);
    var speed = 1 + Math.floor(Math.random() * (this.Asteroid.MAX_SPEED - 1));

    return new Asteroid([x, y], angle, speed, images[index]);
  };

})(this);
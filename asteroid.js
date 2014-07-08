(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, angle, speed, image) {
    Asteroids.MovingObject.call(this, pos, angle, speed, image);
  }

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroids.Asteroid.MAX_SPEED = 10;

  Asteroids.newAngle = function(stroidPos, shipPos) {
    var dy = stroidPos[1] - shipPos[1];
    var dx = stroidPos[0] - shipPos[0];

    return Math.atan(dy/dx)
  };

  Asteroids.newSpawnPoint = function(dimX, dimY) {
    var x = Math.random() * dimX;
    var y = Math.random() * dimY;

    if (coinFlip()) {
      x = coinFlip() * (dimX - 70);
    } else {
      y = coinFlip() * (dimY -70);
    }

    return [x, y];
  };

  Asteroids.randomAsteroid = function (dimX, dimY, images, shipPos) {
    var numImages = images.length;
    var index = Math.floor(Math.random() * numImages);
    var spawnPoint = this.newSpawnPoint(dimX, dimY);
    var angle = this.newAngle(spawnPoint, shipPos);
    var speed = 1 + Math.floor(Math.random() * (this.Asteroid.MAX_SPEED - 1));

    return new Asteroid(spawnPoint, angle, speed, images[index]);
  };

})(this);
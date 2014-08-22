(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, angle, speed, image, splitsLeft) {
    if (splitsLeft === undefined)  this.splitsLeft = Math.floor(Math.random() * Asteroids.Asteroid.MAX_SPLITS);
    Asteroids.MovingObject.call(this, pos, angle, speed, image);
  }

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroids.Asteroid.MAX_SPEED = 4;
  Asteroids.Asteroid.MAX_SPLITS = 3;
  
  Asteroid.prototype.split = function() {
    if (this.splitsLeft > 0) { 
      return [
        new Asteroid(this.pos, Asteroids.randomAngle(), this.speed(), this.img, this.splitsLeft - 1),
        new Asteroid(this.pos, Asteroids.randomAngle(), this.speed(), this.img, this.splitsLeft - 1)
      ];
    }

    return [];
  };

  Asteroids.newAngle = function(stroidPos, shipPos) {
    var dy = stroidPos[1] - shipPos[1];
    var dx = stroidPos[0] - shipPos[0];

    if (dy > 0 && dx < 0) {
      return 5 + ((Math.random() * 2) - 1)
    } else if (dy < 0 && dx < 0) {
      return 6 + ((Math.random() * 2) - 1)
    } else if (dy > 0 && dx > 0) {
      return 3 + ((Math.random() * 2) - 1)
    } else if (dy < 0 && dx > 0) {
      return 2 + ((Math.random() * 2) - 1)
    }
  };

  Asteroids.randomAngle = function() {
    return Math.random() * (2 * Math.PI);
  }

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

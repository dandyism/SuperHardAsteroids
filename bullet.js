(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Bullet = Asteroids.Bullet = function(pos, angle, speed, image) {
    Asteroids.MovingObject.call(this, pos, angle, speed, image);

    this.dead = false;
  };

  Bullet.inherits(Asteroids.MovingObject);

})(this);
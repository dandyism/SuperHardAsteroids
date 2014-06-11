(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(image, bulletImage) {
    var x = Asteroids.Game.DIM_X / 2;
    var y = Asteroids.Game.DIM_Y / 2;
    this.bulletImage = bulletImage;

    Asteroids.MovingObject.call(this, [x,y], 0, 0, image);
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.MAX_SPEED = 20;

  Ship.prototype.power = function (impulse) {
    if(Math.abs(this.speed + impulse <= Ship.MAX_SPEED)) {
      this.speed += impulse;
    }
  };

  Ship.prototype.turn = function (radians) {
    this.angle += radians
    this.angle %= 2 * Math.PI;
  };

  Ship.prototype.fire = function () {
    return new Asteroids.Bullet(this.pos, this.angle, 70, this.bulletImage);
  };
})(this);
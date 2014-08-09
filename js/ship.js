(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(image, bulletImage) {
    var x = Asteroids.Game.DIM_X / 2;
    var y = Asteroids.Game.DIM_Y / 2;
    this.bulletImage = bulletImage;
    this.cooldown = 0;

    Asteroids.MovingObject.call(this, [x,y], 0, 0, image);
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.MAX_SPEED      = 10;
  Ship.COOLDOWN       = 100;
  Ship.COOL_PER_TICK  = 20;

  Ship.prototype.power = function (impulse) {
     this.vector.x += impulse * Math.cos(this.angle);
     this.vector.y += impulse * Math.sin(this.angle);
  };

  Ship.prototype.turn = function (radians) {
    this.angle += radians
    this.angle %= 2 * Math.PI;
  };

  Ship.prototype.fire = function () {
    if (this.cooldown === 0) {
      this.cooldown = Ship.COOLDOWN;
      return new Asteroids.Bullet(this.pos, this.angle, this.speed() + Ship.MAX_SPEED, this.bulletImage);
    }

    return null;
  };

  Ship.prototype.move = function() {
    this.cooldown -= Ship.COOL_PER_TICK;
    this.cooldown = (this.cooldown >= 0) ? this.cooldown : 0;

    Asteroids.MovingObject.prototype.move.apply(this);

    this.x %= Asteroids.Game.DIM_X;
    this.y %= Asteroids.Game.DIM_Y;
  };
})(this);

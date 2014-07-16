(function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Ship = Asteroids.Ship = function(image, bulletImage) {
    var x = Asteroids.Game.DIM_X / 2;
    var y = Asteroids.Game.DIM_Y / 2;
    this.bulletImage = bulletImage;

    Asteroids.MovingObject.call(this, [x,y], 0, 0, image);
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.MAX_SPEED = 10;

  Ship.prototype.power = function (impulse) {
     this.speed += impulse;
     this.speed = (this.speed >= 0) ? this.speed : 0; 
     this.speed = (this.speed <= Ship.MAX_SPEED) ? this.speed : Ship.MAX_SPEED;
  };

  Ship.prototype.turn = function (radians) {
    this.angle += radians
    this.angle %= 2 * Math.PI;
  };

  Ship.prototype.fire = function () {
    return new Asteroids.Bullet(this.pos, this.angle, this.speed + Ship.MAX_SPEED, this.bulletImage);
  };
})(this);

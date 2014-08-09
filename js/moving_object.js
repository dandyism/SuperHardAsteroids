( function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function (pos, angle, speed, img, radius) {
    this.pos = pos;
    this.angle = angle;
    this.vector = {
      x: speed * Math.cos(this.angle),
      y: speed * Math.sin(this.angle)
    }
    this.img = img;
    this.radius = (typeof radius === "undefined") ? this.img.width / 3 : radius;
    this.dead = false;
  }

  MovingObject.prototype.draw = function (ctx) {
    if (this.dead) {
      return;
    }

    ctx.save();

    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle);
    ctx.drawImage(this.img, 0 - this.img.width / 2, 0 - this.img.height / 2);

    ctx.restore();
  };

  MovingObject.prototype.speed = function() {
    return this.vector.x / Math.cos(this.angle);
  };

  MovingObject.prototype.getDistance = function (otherObject) {
    var deltaX = Math.abs(this.pos[0] - otherObject.pos[0]);
    var deltaY = Math.abs(this.pos[1] - otherObject.pos[1]);

    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    return this.getDistance(otherObject) <= this.radius + otherObject.radius;
  };

  MovingObject.prototype.move = function () {
    if (this.dead) {
      return;
    }

    var x = this.pos[0];
    var y = this.pos[1];

    var newX = (x + this.vector.x) % Asteroids.Game.DIM_X;
    var newY = (y + this.vector.y) % Asteroids.Game.DIM_Y;

    newX = (newX > 0) ? newX : Asteroids.Game.DIM_X;
    newY = (newY > 0) ? newY : Asteroids.Game.DIM_Y;

    this.pos = [newX, newY];
  };

})(this);

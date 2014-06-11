( function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function (pos, angle, speed, img, radius) {
    this.pos = pos;
    this.angle = angle;
    this.speed = speed;
    this.img = img;
    this.radius = (typeof radius === "undefined") ? this.img.width / 2 : radius;
  }

  MovingObject.prototype.draw = function (ctx) {
    ctx.save();

    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle);
    ctx.drawImage(this.img, 0 - this.img.width / 2, 0 - this.img.height / 2);

    ctx.restore();
  };

  MovingObject.prototype.getDistance = function (otherObject) {
    var deltaX = Math.abs(this.pos[0] - otherObject.pos[0]);
    var deltaY = Math.abs(this.pos[1] - otherObject.pos[1]);

    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    return this.getDistance(otherObject) <= this.radius + otherObject.radius;
  };



})(this);
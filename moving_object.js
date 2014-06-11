( function(root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var MovingObject = Asteroids.MovingObject = function (pos, angle, speed, img, radius) {
    this.pos = pos;
    this.angle = angle;
    this.speed = speed;
    this.img = img;
    this.radius = (typeof radius === "undefined") ? this.img.width : radius;
  }

  MovingObject.prototype.draw = function (ctx) {
    ctx.save();

    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle);
    ctx.drawImage(this.img, 0 - this.img.width / 2, 0 - this.img.height / 2);

    ctx.restore();
  };



})(this);
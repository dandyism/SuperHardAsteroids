Function.prototype.inherits = function (superClass) {
  function Surrogate() {};
  Surrogate.prototype = superClass.prototype;
  this.prototype = new Surrogate();
};

function coinFlip() {
  return Math.floor(Math.random() + 0.5);
}
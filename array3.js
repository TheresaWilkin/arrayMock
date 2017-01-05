var memory = require('./memory');

var Array = function() {
  this.length = 0;
  this.capacity = 0;
  this.ptr = memory.allocate(this.length);
}

Array.RATIO_SIZE = 3;

Array.prototype.resize = function() {
  // if (this.ptr >= this.length)
  var oldPtr = this.ptr;
  this.ptr = memory.allocate((this.length + 1) * Array.RATIO_SIZE);
  this.capacity = (this.length + 1) * Array.RATIO_SIZE;
  memory.copy(this.ptr, oldPtr, this.length);
  memory.free(oldPtr);
}

Array.prototype.push = function(value) {
  //error?
  if(this.length + 1 > this.capacity) {
    this.resize();
  }
  memory.set(this.ptr + this.length, value);
  this.length++;
}

Array.prototype.get = function(index) {
  return memory.get(this.ptr + index);
}


var testArr = new Array;
testArr.push(7);
console.log(testArr.ptr)
console.log(testArr.get(0));

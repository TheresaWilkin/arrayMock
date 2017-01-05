var memory = require('./memory');

var Array = function() {
  this.length = 0;
  this.capacity = 0;
  this.ptr = memory.allocate(this.length);
}

Array.RATIO_SIZE = 3;

Array.prototype.resize = function() {
  var oldPtr = this.ptr;
  this.ptr = memory.allocate((this.length + 1) * Array.RATIO_SIZE);
  if(this.ptr === null) {
    throw new Error("Not enough memory");
  }
  this.capacity = (this.length + 1) * Array.RATIO_SIZE;
  memory.copy(this.ptr, oldPtr, this.length);
  memory.free(oldPtr);
}

Array.prototype.push = function(value) {
  if(this.length + 1 > this.capacity) {
    this.resize();
  }
  memory.set(this.ptr + this.length, value);
  this.length++;
}

Array.prototype.get = function(index) {
  if(this.ptr + index < 0 || index >= this.length) {
    throw new Error ("Invalid index");
  }
  return memory.get(this.ptr + index);
}

Array.prototype.pop = function() {
  if (this.length == 0) {
        throw new Error('Array already empty');
  }
  var value = memory.get(this.ptr + this.length - 1);
  this.length --;
  return value;
}

Array.prototype.insert = function(index, value) {
  if(this.ptr + index < 0 || index >= this.length) {
    throw new Error ("Invalid index");
  }
  if(this.length + 1 > this.capacity) {
    this.resize();
  }
  memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
  memory.set(this.ptr + index, value);
  this.length ++;
}

Array.prototype.remove = function(index) {
  memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
  this.length --;
}

Array.prototype.shift = function() {
  var value = memory.get(0)
  memory.copy(this.ptr, this.ptr + 1, this.length - 1);
  this.length--;
  return value;
}

Array.prototype.unshift = function(value) {
  memory.copy(this.ptr + 1, this.ptr, this.length);
  memory.set(this.ptr, value);
  this.length++;
}
var testArr = new Array;
testArr.push(7);
console.log(testArr.get(0));
testArr.insert(0, 6);
console.log(testArr.get(0), testArr.get(1));
testArr.delete(0);
console.log(testArr.get(0));

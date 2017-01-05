var memory = require('./memory');

var Array = function() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
};
Array.SIZE_RATIO = 3;

Array.prototype.push = function(value) {
	console.log("array.push");
    if (this.length >= this._capacity) {
        this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.set(this.ptr + this.length, value);
    this.length++;
};

Array.prototype._resize = function(size) {
	console.log("array._resize");
    var oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
        throw new Error('Out of memory');
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capacity = size;
};

Array.prototype.get = function(index) {
	console.log("array.get");
    if (index < 0 || index >= this.length) {
        throw new Error('Index error');
    }
    return memory.get(this.ptr + index);
};

Array.prototype.pop = function() {
	console.log("array.pop");
    if (this.length == 0) {
        throw new Error('Index error');
    }
    var value = memory.get(this.ptr + this.length - 1);
    this.length--;
    return value;
};

Array.prototype.insert = function(index, value) {
	console.log("array.insert")
    if (index < 0 || index >= this.length) {
        throw new Error('Index error');
    }

    if (this.length >= this._capacity) {
        this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
};

Array.prototype.remove = function(index) {
	console.log("array.remove");
    if (index < 0 || index >= this.length) {
        throw new Error('Index error');
    }

    memory.copy(this.ptr + index, this.ptr + index + 1, this.length - index - 1);
    this.length--;
};

Array.prototype.shift = function() {
	console.log("array.shift");
	var value = memory.get(0)
	memory.copy(this.ptr, this.ptr + 1, this.length - 1);
	this.length--;
	return value;
}



console.log("starting new action");
let newArray = new Array; //[]
console.log("starting new action");
newArray.push(1); //[1]
console.log("starting new action");
newArray.push(2); //[2]
// console.log("starting new action");
// newArray.get(0); //1
// console.log("starting new action");
// newArray.pop(); //[1]
// console.log("starting new action");
// newArray.push(6); //[1, 6]
// console.log("starting new action");
// newArray.insert(1, 3); //[1, 3, 6]
// console.log("starting new action");
// newArray.remove(2); //[1,3]
// console.log("starting new action");
// newArray.push(4); //[1, 3, 4]
// console.log("starting new action");
// newArray.push(5); //[1, 3, 4, 5]
// console.log("starting new action");
// newArray.insert(1, 3); //[1, 3, 6]
// console.log(newArray);
console.log(newArray.shift());
console.log(newArray.get(0));

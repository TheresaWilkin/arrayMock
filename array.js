var memory = require('./memory');

const Array = () => {
	this.length = 0;
	this.ptr = memory.allocate(this.length);
}

Array.prototype._resize = (size) => {
	let oldPtr = this.ptr;
	this.ptr = memory.allocate(size);
	if (this.ptr === null) {
		throw new Error('Out of memory');
	}
	memory.copy(this.ptr, oldPtr, this.length);
	memory.free(oldPtr);
}

 
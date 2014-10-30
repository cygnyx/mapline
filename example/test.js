var Counter = require('stream').Readable;

Counter.call(this);

Counter.prototype._read = function() {
    if (this.buf == null) {
	this.buf = new Buffer('a\nb\n', 'ascii');
	this.push(this.buf);
    } else
	this.push(null);
};

var c = new Counter();
c.pipe(process.stdout);

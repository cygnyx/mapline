var mapline = require('..');
var stream = require('stream');

var inp = new stream.Readable();
var out = new stream.Writable();

stream.Readable.call(inp);

inp._read = function(size) {
    if (this.buf == null) {
	this.buf = new Buffer('a\nb\n', 'ascii');
	this.push(this.buf);
    } else
	this.push(null);
};

stream.Writable.call(out);

var outbuf = "";

out._write = function(chunk, encoding, callback) {
    outbuf = outbuf + chunk.toString();
    callback();
};

mapline(inp, function(line){
    if (line != null)
	out.write('_'+line+'\n');
    else
	out.end();
})

console.dir(outbuf);

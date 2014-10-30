var test = require('tape');

var mapline = require('..');
var stream = require('stream');

var inp = new stream.Readable();
var out = new stream.Writable();

var inpstr = 'a\nb\n';
var outstr = '_a\n_b\n';

stream.Readable.call(inp);

inp._read = function(size) {
    if (this.buf == null) {
	this.buf = new Buffer(inpstr, 'ascii');
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

test('testnewline', function (t) {
    t.plan(1);
    t.equal(outbuf, outstr);
});


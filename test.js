var test = require('tape');

var mapline = require('..');
var stream = require('stream');

var inp = new stream.Readable();
var out = new stream.Writable();

var EOL = require('os').EOL;

var inpstr = 'a' + EOL + 'b' + EOL;
var outstr = '_a' + EOL + '_b' + EOL;

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
	out.write('_'+line+EOL);
    else
	out.end();
})

test('testnewline', function (t) {
    t.plan(1);
    t.equal(outbuf, outstr);
});

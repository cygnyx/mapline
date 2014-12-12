
module.exports = function(opts, fn) {

    if (typeof opts == "function") {
	fn = opts;
	opts = {};
    } else if (!opts) opts = {}

    var m = new require('stream').Transform()
    m.EOL = opts.EOL ? opts.EOL : require('os').EOL;
    m.prior = ""

    var post = fn || opts.fn || function(e) {return e+m.EOL}

    m.emitter = function(m) {
	return function(e) {
	    m.push(post(e))
	}
    }(m);

    m._transform = function(chunk, encoding, done) {
	var lines = (this.prior == "") ?
	    chunk.toString().split(this.EOL) :
	    (this.prior + chunk.toString()).split(this.EOL)
	this.prior = lines.pop();
	lines.forEach(this.emitter)
	done()
    }

    m._flush = function(done) {
	if (this.prior != "") {
	    this.emitter(this.prior)
	    this.prior = ""
	}
	done()
    }

    return m;
}

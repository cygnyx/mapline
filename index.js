var EOL = require('os').EOL;

module.exports = function mapline(rs, fnc) {
    if (typeof(rs) == "function") {
	fnc = rs;
	rs = process.stdin;
    }
    
    var last = "";
    var lines;
    
    rs.on('data', function(chunk) {

	lines = (last+chunk).split(EOL);
	lines.slice(0, -1).forEach(fnc);
	last = lines.slice(-1);
    });

    rs.on('end', function() {
	if (last != "")
	    fnc(last);
	fnc(null);
    });

};

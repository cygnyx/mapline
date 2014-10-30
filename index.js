module.exports = function mapline(rs, fnc) {
    if (typeof(rs) == "function") {
	fnc = rs;
	rs = process.stdin;
    }
    
    var last = "";
    var lines;
    
    rs.on('data', function(chunk) {

	lines = (last+chunk).split("\n");

	for (var i = 0; i < lines.length - 1; i++)
	    fnc(lines[i]);
	last = lines[lines.length - 1];
    });

    rs.on('end', function() {
	if (last != "")
	    fnc(last);
	fnc(null);
    });

};
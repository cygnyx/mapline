# mapline

map a stream line by line

This module reads a stream line by line, mapping a function on them.
function is called with null on the last iteration.

# example

``` js
require('mapline')(function(line){if(line) console.log('_'+line);});
```

```
$ (echo a; echo b) | node -e "require('mapline')(function(line){if (line)console.log('_'+line);})"
_a
_b
```

# methods

``` js
var mapline = require('mapline')
```
## mapline(fn)
## mapline(rs, fn)

Returns a function that applies `fn` to each line of input text.

Optional `rs` defaults to process.stdin.

# install

With [npm](https://npmjs.org) do:

```
npm install mapline
```

# license

MIT

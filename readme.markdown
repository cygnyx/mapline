# mapline

map a stream line by line

This module reads a stream line by line, mapping a function on them.

#[![browser support](https://ci.testling.com/substack/minimist.png)](http://ci.testling.com/substack/minimist)

#[![build status](https://secure.travis-ci.org/substack/minimist.png)](http://travis-ci.org/substack/minimist)

# example

``` js
var mapline = require('mapline');
mapline(function(line){
  console.log('_'+line);
});

```

```
$ (echo a; echo b) | node example.js
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

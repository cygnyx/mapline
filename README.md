# Mapline

This module reads a stream line by line, mapping a function on each line.
The line delimiter is stripped off each line.

# Example

There is a basic command line usage:

```
$ (echo "a"; echo "b") | node -e "process.stdin.pipe(require('mapline')(function(e){return '_'+e+'\n'})).pipe(process.stdout)"
_a
_b
```

Here is the same example with a delay between the input lines.
Notice that the pipes run through as soon as data are available.

```
$ (echo "a"; sleep 1; echo "b") | node -e "process.stdin.pipe(require('mapline')(function(e){return '_'+e+'\n'})).pipe(process.stdout)"
_a
_b
```

To convert unix lines into MS lines:

``` 
$ (echo "a"; echo "b") | node -e "process.stdin.pipe(require('mapline')(function(e){return e+'\r\n'})).pipe(process.stdout)" > junk.out
```
 
To convert MS lines into unix lines:

```
$ cat junk.out | node -e "process.stdin.pipe(require('mapline')({EOL:String.fromCharCode(13,10)})).pipe(process.stdout)"
a 
b 
```

# Methods

Mapline provides a single function which generates the stream transform.

```
var mapline = require('mapline')
var suffix = mapline(function(e){return e+'_'+'\n'}) 
var prefix = mapline(function(e){return '_'+e+'\n'})

process.stdin.pipe(suffix).pipe(prefix).pipe(process.stdout)
```
 
# Install

With [npm](https://npmjs.org) do:

```
npm install mapline
```

# License

MIT

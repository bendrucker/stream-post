# stream-post [![Build Status](https://travis-ci.org/bendrucker/stream-post.svg?branch=master)](https://travis-ci.org/bendrucker/stream-post)

> Simple stream -> http post request

Heavily based on feross's [simple-get](https://github.com/feross/simple-get). Instead of passing a body value and letting the library end the request for you, stream-post just returns the http request (`req`). stream-post drops redirect support since that requires buffered data.

## Install

```
$ npm install --save stream-post
```


## Usage

```js
var streamPost = require('stream-post')
var fs = require('fs')

fs.createReadStream('beep.txt')
  .pipe(streamPost({url: '/'}, function (err, res) {
    if (err) throw err
    res.pipe(process.stdout)  
  }))
```

## API

#### `streamPost(options, callback)` -> `stream`

Returns an [`http.ClientRequest`](https://nodejs.org/api/http.html#http_class_http_clientrequest).

##### options

*Required*  
Type: `object`

A set of options to pass to `http.request`. The following special options are also provided:

###### json

Type: `boolean`  
Default: `false`

When set, the library will add JSON headers (`accept` and `content-type`) and attempt to decode a JSON response body.

##### callback

*Required*  
Type: `function`  
Arguments: `err, res, [data]`

A callback to be called with a request error and the [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_class_http_incomingmessage) response. The response `data` is not read by default. Calling `streamPost.concat` reads the data as a Buffer or JSON (with `options.json`).


## License

MIT © [Ben Drucker](http://bendrucker.me)

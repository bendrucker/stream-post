'use strict'

var test = require('tape')
var http = require('http')
var toStream = require('from2-string')
var concat = require('concat-stream')
var post = require('./')

test('post (text body)', function (t) {
  t.plan(4)

  var server = http.createServer(function (req, res) {
    t.equal(req.method, 'POST')
    res.statusCode = 200
    req.pipe(res)
  })

  server.listen(0, function () {
    var port = server.address().port
    var opts = {
      url: 'http://localhost:' + port
    }

    toStream('beep').pipe(post(opts, function (err, res) {
      t.error(err)
      t.equal(res.statusCode, 200)
      res.pipe(concat(function (data) {
        t.equal(data.toString(), 'beep')
        server.close()
      }))
    }))
  })
})

test('post (concat)', function (t) {
  t.plan(4)

  var server = http.createServer(function (req, res) {
    t.equal(req.method, 'POST')
    res.statusCode = 200
    req.pipe(res)
  })

  server.listen(0, function () {
    var port = server.address().port
    var opts = {
      url: 'http://localhost:' + port
    }

    toStream('beep').pipe(post.concat(opts, function (err, res, data) {
      t.error(err)
      t.equal(res.statusCode, 200)
      t.equal(data.toString(), 'beep')
      server.close()
    }))
  })
})

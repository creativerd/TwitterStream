// server.js
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

// Start an HTTP server on port 8080
app.listen(8080);

function handler(req, res) {
    // Hardcode *all* HTTP requests to this server to serve up index.html
    fs.readFile(
        __dirname + '/index.html',
        function (err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        }
    );
}



io.sockets.on(
    'connection',
    function (socket) {
        socket.emit('load', 'connection made');
        console.log("socket.emit('load', 'connection made');")
        socket.on('clientside event', function (data) {
          var hashtag = '#bbc'
          var tweeter = function(input) {
            socket.emit('tweet', input);
          }
          tweetin(hashtag, tweeter);
          console.log("tweetin(hashtag, tweeter)")
        });
    }
);

var tweetin = function(args, func) {
  var twitter = require('ntwitter');
  var credentials = require('./credentials.js');
  var t = new twitter({
      consumer_key: credentials.consumer_key,
      consumer_secret: credentials.consumer_secret,
      access_token_key: credentials.access_token_key,
      access_token_secret: credentials.access_token_secret
  });

  t.stream(
      'statuses/filter',
      { track: [args] },
      function(stream) {
          stream.on('data', function(tweet) {
              console.log(tweet.text);
              func(tweet.text);
          });
          console.log("function(stream) {")
      }
  );

  
}

//


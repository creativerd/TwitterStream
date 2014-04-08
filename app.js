var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

server.listen(process.env.PORT || 8080);
io.set('loglevel',10); // set log level to get all debug messages

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});


app.use(express.static(__dirname + '/public')); // set up asset paths


app.get('/',function(req,res){  // route controller for index
  res.render('index.jade')
});

io.on('connection',function (socket) {
    socket.emit('load', 'connection made');
    socket.on('clientside event', function (data) {
      var hashtag = ['#MODUSAW14','#beautiful-future'];
      var tweeter = function(input) {
        socket.emit('tweet', input);
      }
      tweetin(hashtag, tweeter);
    });
});

var tweetin = function(args, func) {
  var twitter = require('ntwitter');
  var credentials = require('./credentials.js');
  var t = new twitter({
      consumer_key: credentials.consumer_key,
      consumer_secret: credentials.consumer_secret,
      access_token_key: credentials.access_token_key,
      access_token_secret: credentials.access_token_secret
  });
  console.log(t);

  t.stream(
      'statuses/filter',
      { track: [args] },
      function(stream) {
          stream.on('data', function(tweet) {
              console.log(tweet.text);
              func(tweet);
          });
      }
  );

  
}

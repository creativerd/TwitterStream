var mongoose = require('mongoose');

exports.userlist = function userlist(gname,callback) {
  var User = mongoose.model( 'Users' );
  User.find({'group':gname}, function (err, users) {
  if(err) {
    console.log(err);
  } else {
    console.log(users);
    callback("", users);
  }
 })// end User.find
}// end exports.teamlist

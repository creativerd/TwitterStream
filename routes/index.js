
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express way' });
};

var userdata = require('../models/users');

exports.index = function(req, res){
  var strGroup = "admins";
  userdata.userlist(strGroup,function(err,userlist){
  res.render('index', {
   title: 'Hashtag Cashcade',
   pagetitle: 'Hello there',
   group: strGroup,
   users: userlist
  });
 });
};

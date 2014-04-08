
/*
 * GET users listing.
 */

exports.page = function(req, res){
  res.render('about', { title: 'Tweet page', foo: 'fooble' });

};

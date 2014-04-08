var mongoose = require( 'mongoose' ),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;


var usersSchema = new Schema({
  id    : ObjectId,
  user  : String,
  userid: String,
  group : String,
  date  : Date

});

usersSchema.path('date').default(function(){
  return new Date()
}).set(function(v){
  return v == 'now' ? new Date() : v;
});


mongoose.connect( 'mongodb://localhost/hashtagcascadedb' );

module.exports = mongoose.model('Users', usersSchema);  // expose 


var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  facebookID : String,
  token : String,
  displayName : String,
  location : String,
  commitments : [
    {commitment : String}
  ]
})

module.exports = mongoose.model('User', userSchema);
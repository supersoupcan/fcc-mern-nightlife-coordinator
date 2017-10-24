var mongoose = require('mongoose');

var counterSchema = mongoose.Schema(
  {
    name : String,
    count : Number
  },
  {
    versionKey: false
})

module.exports = mongoose.model('Counter', counterSchema);
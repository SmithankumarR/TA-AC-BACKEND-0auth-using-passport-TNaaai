var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    username: { type: String, require: true },
    photo: { type: String },
  },
  { timestamps: true }
);

var User = mongoose.model('User', userSchema);
module.exports = User;

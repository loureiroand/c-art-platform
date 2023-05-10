const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  type: String
});

const User = model('User', userSchema);

module.exports = User;

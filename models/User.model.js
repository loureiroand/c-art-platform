const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  accountType: {
    isStudent: {
      type: Boolean
    },
    isInstructor: {
      type: Boolean
    }
  }
});

const User = model('User', userSchema);

module.exports = User;

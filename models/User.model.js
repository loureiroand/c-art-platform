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
  },
  enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }] // Reference to the Course model
});

const User = model('User', userSchema);

module.exports = User;

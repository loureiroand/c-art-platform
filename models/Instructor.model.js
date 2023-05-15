const { Schema, model, default: mongoose } = require('mongoose');

const instructorSchema = new Schema({
  first_name: String,
  last_name: String,
  address: [
    {
      country: String,
      city: String
    }
  ],
  username: String,
  email: String,

  courses: [
    {
      course_id: { type: [mongoose.Schema.Types.ObjectId] },
      course_title: { type: String }
    }
  ]
});

const Instructor = model('Instructor', instructorSchema);

module.exports = Instructor;
<<<<<<< HEAD
=======

const userInstructor = await userInstructor.findOne({ username });
if (userInstructor !== null) {
  res.render('auth/signup', { errorMessage: 'Username already exists' });
  return;
}
>>>>>>> 34106c9714490b319a0e077301c84ec551706a10

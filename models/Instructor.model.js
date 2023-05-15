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

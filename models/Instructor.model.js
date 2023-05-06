const { Schema, model, default: mongoose } = require('mongoose');

const instrauctorSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  address: [
    {
      country: String,
      city: String
    }
  ],
  username: {
    type: String
  },
  classes: [
    {
      class_id: { type: [mongoose.Schema.Types.ObjectId] },
      class_title: { type: String }
    }
  ]
});

const instructorModel = model('Instructor', instructorSchema);

module.exports = instructorModel;

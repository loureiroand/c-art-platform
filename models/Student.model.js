const { Schema, model, default: mongoose } = require('mongoose');

const studentSchema = new Schema({
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

const studentModel = model('Student', studentSchema);

module.exports = studentModel;

const { Schema, model } = require('mongoose');

const classSchema = new Schema(
  {
    title: {
      type: String
    },
    description: {
      type: String
    },
    instructor: {
      type: String
    },
    rating: {
      type: Number
    },
    reviews: [{ user: String, comment: String }],

    videoUrl: {
      String
    },
    lessons: [
      {
        lesson_number: { type: Number },
        lesson_title: { type: String },
        lesson_body: { type: String },
        lesson_category: [{ type: String }]
      }
    ]
  },
  {
    timestamps: true
  }
);

const classModel = model('Classes', classSchema);

module.exports = classModel;

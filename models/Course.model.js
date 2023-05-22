const { Schema, model } = require('mongoose');

const courseSchema = new Schema(
  {
    title: String,
    description: String,
    instructor: String,
    imageUrl: String
  },
  {
    timestamps: true
  }
);

const Course = model('Course', courseSchema);

module.exports = Course;

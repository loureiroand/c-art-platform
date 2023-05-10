const { Schema, model } = require('mongoose');

const courseSchema = new Schema(
  {
    title: String,
    description: String,
    instructor: String,
    rating: Number,
    lessons: [
      {
        lesson_number: Number,
        lesson_title: String,
        lesson_body: String
      }
    ]
  },
  {
    timestamps: true
  }
);

const Course = model('Course', courseSchema);

module.exports = Course;

module.exports.getCourses = (callback, limit) => {
  Class.find(callback).limit(limit);
};

module.exports.getCourseById = (id, callback) => {
  Course.findById(id, callback);
};

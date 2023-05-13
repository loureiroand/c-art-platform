const express = require('express');
const router = express.Router();
const Course = require('../models/Course.model');
const Instructor = require('../models/Instructor.model');
const User = require('../models/User.model');

// Middleware
function requireInstructor(req, res, next) {
  if (
    req.session.currentUser &&
    req.session.currentUser.accountType.isInstructor === 'instructor'
  ) {
    next();
  } else {
    res.redirect('/');
  }
}

// Get courses
router.get('/courses', async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.render('courses/course-index', { courses: courses });
  } catch (err) {
    next(err);
  }
});

// Create new course
router.post('/courses', requireInstructor, async (req, res, next) => {
  try {
    const { title, description, instructor, rating, lessons } = req.body;
    const newCourse = await Course.create({
      title,
      description,
      instructor,
      rating,
      lessons
    });
    res.redirect('/courses');
  } catch (error) {
    res.status(500).send('Failed to create course.');
  }
});

// // Update course by ID
// router.put('/courses/:id', requireInstructor, async (req, res) => {
//   try {
//     const { title, description, instructor, rating, lessons } = req.body;
//     await Course.findByIdAndUpdate(
//       req.params.id,
//       { title, description, instructor, rating, lessons },
//       { new: true }
//     );
//     res.redirect(`/courses/${req.params.id}`);
//   } catch (error) {
//     res.status(500).send('Failed to update course.');
//   }
// });

// // Delete course by ID
// router.delete('/courses/:id', requireInstructor, async (req, res) => {
//   try {
//     await Course.findByIdAndDelete(req.params.id);
//     res.redirect('/courses');
//   } catch (error) {
//     res.status(500).send('Failed to delete course.');
//   }
// });

// Create new lesson for a course
router.post('/courses/:id/lessons', requireInstructor, async (req, res) => {
  try {
    const courseId = req.params.id;
    const { lesson_number, lesson_title, lesson_body } = req.body;
    await Lesson.create({
      course: courseId,
      lesson_number,
      lesson_title,
      lesson_body
    });
    res.redirect(`/courses/${courseId}`);
  } catch (error) {
    res.status(500).send('Failed to create lesson.');
  }
});

// Update lesson by ID
router.put(
  '/courses/:courseId/lessons/:lessonId',
  requireInstructor,
  async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const lessonId = req.params.lessonId;
      const { lesson_number, lesson_title, lesson_body } = req.body;
      await Lesson.findByIdAndUpdate(
        lessonId,
        { lesson_number, lesson_title, lesson_body },
        { new: true }
      );
      res.redirect(`/courses/${courseId}`);
    } catch (error) {
      res.status(500).send('Failed to update lesson.');
    }
  }
);

// Delete lesson by ID
router.delete(
  '/courses/:courseId/lessons/:lessonId',
  requireInstructor,
  async (req, res) => {
    try {
      const courseId = req.params.courseId;
      const lessonId = req.params.lessonId;
      await Lesson.findByIdAndDelete(lessonId);
      res.redirect(`/courses/${courseId}`);
    } catch (error) {
      res.status(500).send('Failed to delete lesson.');
    }
  }
);

router.get('/dashboard', (req, res) => {
  res.render('instructor/instructor-dashboard');
});

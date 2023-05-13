const express = require('express');
const router = express.Router();
const Course = require('../models/Course.model');

router.get('/courses', async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.render('courses/course-index', { courses: courses });
  } catch (err) {
    next(err);
  }
});

// Get course details
router.get('/courses/:id/details', async (req, res, next) => {
  try {
    const courseName = await Course.findById(req.params.id);
    res.render('courses/course-details', { course: courseName });
  } catch (err) {
    next(err);
  }
});

// Get lessons
router.get('/courses/:id/lessons', async (req, res, next) => {
  try {
    const coursesLessons = await Course.findById(req.params.id);
    res.render('courses/course-lessons', { courses: coursesLessons });
  } catch (err) {
    next(err);
  }
});

// Get lesson
router.get('/courses/:id/lesson_id', async (req, res, next) => {
  try {
    const courseLesson = await Course.findById(req.params.id);
    res.render('courses/course-lesson', { courses: courseLesson });
  } catch (err) {
    next(err);
  }
});

// router.get('/', async (req, res, next) => {
//   try {
//     const courses = await Course.find(3);
//     res.render('courses/course-index', { courses });
//   } catch (err) {
//     next(err);
//   }
// });

// router.get('/:id/details', async (req, res, next) => {
//   try {
//     const courseName = await Course.findById(req.params.id);
//     res.render('courses/course-details', { course: courseName });
//   } catch (err) {
//     next(err);
//   }
// });

// router.get('/:id/lessons', async (req, res, next) => {
//   try {
//     const courseName = await Course.findById(req.params.id);
//     res.render('courses/course-lesson', { Course: courseName });
//   } catch (err) {
//     next(err);
//   }
// });

// router.get('/:id/lessons/:lessons_id', async (req, res, next) => {
//   try {
//     const courseName = await Course.findById(req.params.id);
//     for (i = 0; i < courseName.lessons.length; i++) {
//       if (courseName.lessons[i.lesson_number === req.params.lesson_id]) {
//         lesson = courseName.lessons[i];
//       }
//     }

//     res.render('courses/course-lesson', { Course: courseName, lesson });
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;

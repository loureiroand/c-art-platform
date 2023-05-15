const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const authMiddleware = require('../middleware/authMiddleware');
const Course = require('../models/Course.model');
const Instructor = require('../models/Instructor.model');

// get courses
=======
const Course = require('../models/Course.model');

>>>>>>> 34106c9714490b319a0e077301c84ec551706a10
router.get('/courses', async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.render('courses/course-index', { courses: courses });
  } catch (err) {
    next(err);
  }
});

<<<<<<< HEAD
router.get(
  '/courses/create',
  authMiddleware.requireInstructor,
  async (req, res, next) => {
    try {
      /*  const { title, description, instructor, rating, lessons } = req.body;
      const newCourse = await Course.create({
        title,
        description,
        instructor,
        rating,
        lessons
      }); */
      res.render('courses/course-create');
    } catch (error) {
      next(err);
    }
  }
);

// Create new course
router.post(
  '/courses/create',
  authMiddleware.requireInstructor,
  async (req, res, next) => {
    try {
      const { title, description, instructor, rating, lessons } = req.body;
      const newCourse = await Course.create({
        title,
        description,
        instructor,
        rating,
        lessons
      });

      // Find the instructor by ID
      /*   const instructorFromDB = await Instructor.findById(instructor);
      if (!instructor) {
        return res
          .status(404)
          .render('error', { error: 'Instructor not found' });
      }

      instructorFromDB.courses.push({
        course_id: newCourse._id,
        course_title: newCourse.title
      });
      await instructorFromDB.save(); */

      res.redirect('courses');
    } catch (error) {
      next(error);
    }
  }
);

//Courses details
router.get('/courses/:id', async (req, res, next) => {
  try {
    const courseName = await Course.findById(req.params.id);
    res.render('courses/course-details', courseName);
=======
// Get course details
router.get('/courses/:id/details', async (req, res, next) => {
  try {
    const courseName = await Course.findById(req.params.id);
    res.render('courses/course-details', { course: courseName });
>>>>>>> 34106c9714490b319a0e077301c84ec551706a10
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

<<<<<<< HEAD
router.get('/courses/:id/lessons/:lesson_id', async (req, res, next) => {
  try {
    const courses = await Course.findById(req.params.id);
    const lesson = Course.lessons.find(
      lesson => lesson._id.toString() === req.params.lesson_id
    );
    res.render('courses/course-lesson', { courses: courses, lesson: lesson });
=======
// Get lesson
router.get('/courses/:id/lesson_id', async (req, res, next) => {
  try {
    const courseLesson = await Course.findById(req.params.id);
    res.render('courses/course-lesson', { courses: courseLesson });
>>>>>>> 34106c9714490b319a0e077301c84ec551706a10
  } catch (err) {
    next(err);
  }
});

<<<<<<< HEAD
router.post(
  '/courses/:id/edit',
  authMiddleware.requireInstructor,
  async (req, res, next) => {
    try {
      const courseId = req.query.id;
      const { title, description, instructor, rating, lessons } = req.body;

      // Find the course by ID
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).render('error', { error: 'Course not found' });
      }

      if (!course.instructor.equals(instructor)) {
        return res.status(403).render('error', { error: 'Forbidden' });
      }

      course.title = title;
      course.description = description;
      course.rating = rating;
      course.lessons = lessons;

      await course.save();

      res.redirect(`/courses/${courseId}`);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/courses/delete/:id',
  authMiddleware.requireInstructor,
  async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.redirect('/courses');
  }
);
=======
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
>>>>>>> 34106c9714490b319a0e077301c84ec551706a10

module.exports = router;

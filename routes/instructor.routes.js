const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const authMiddleware = require('../middleware/authMiddleware');
const Course = require('../models/Course.model');
const Instructor = require('../models/Instructor.model');

router.get('/courses/create', authMiddleware.requireInstructor, (req, res) => {
  res.render('courses/course-create');
});

router.post(
  '/courses',
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

      const instructorFromDB = await Instructor.findById(instructor);
      if (!instructorFromDB) {
        return res
          .status(404)
          .render('error', { error: 'Instructor not found' });
      }

      instructorFromDB.courses.push({
        course_id: newCourse._id,
        course_title: newCourse.title
      });
      await instructorFromDB.save();

      res.redirect('/instructors/instructor-dashboard');
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/courses/:id/edit',
  authMiddleware.requireInstructor,
  async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).render('error', { error: 'Course not found' });
      }

      res.render('courses/course-edit', { course });
    } catch (error) {
      next(error);
=======
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
>>>>>>> 34106c9714490b319a0e077301c84ec551706a10
    }
  }
);

<<<<<<< HEAD
router.post(
  '/courses/:id/edit',
  authMiddleware.requireInstructor,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, description, instructor, rating, lessons } = req.body;

      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).render('error', { error: 'Course not found' });
      }

      if (!course.instructor.equals(instructor)) {
        return res.status(403).render('error', { error: 'Forbidden' });
      }

      course.title = title;
      course.description = description;
      course.instructor = instructor;
      course.rating = rating;
      course.lessons = lessons;
      await course.save();

      res.redirect(`/courses/${id}`);
    } catch (error) {
      next(error);
=======
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
>>>>>>> 34106c9714490b319a0e077301c84ec551706a10
    }
  }
);

<<<<<<< HEAD
router.post(
  '/courses/:id/delete',
  authMiddleware.requireInstructor,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.session.currentUser._id;

      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).render('error', { error: 'Course not found' });
      }

      if (!course.instructor.equals(userId)) {
        return res.status(403).render('error', { error: 'Forbidden' });
      }

      await Course.findByIdAndDelete(id);

      res.redirect('/instructors/instructor-dashboard');
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
=======
router.get('/dashboard', (req, res) => {
  res.render('instructor/instructor-dashboard');
});
>>>>>>> 34106c9714490b319a0e077301c84ec551706a10

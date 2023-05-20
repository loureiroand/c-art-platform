const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Course = require('../models/Course.model');
const User = require('../models/User.model');

// Student Dashboard
<<<<<<< HEAD
/* router.get(
  '/student/dashboard',
  authMiddleware.requireStudent,
  async (req, res, next) => {
    try {
      res.render('students/student-dashboard');
    } catch (err) {
      next(err);
    }
  }
); */

// Display enrolled courses
=======
>>>>>>> 5ca14bfa3aa563bd089a6b1a887d7d6f14a39df6
router.get(
  '/student/dashboard',
  authMiddleware.requireStudent,
  async (req, res, next) => {
    try {
<<<<<<< HEAD
      const userId = req.session.currentUser._id;

      const user = await User.findById(userId).populate('enrolledCourses');

      if (!user) {
        return res.status(404).render('error', { error: 'User not found' });
      }

      const enrolledCourses = user.enrolledCourses;

      res.render('students/student-dashboard', { enrolledCourses });
=======
      res.render('students/student-dashboard');
>>>>>>> 5ca14bfa3aa563bd089a6b1a887d7d6f14a39df6
    } catch (err) {
      next(err);
    }
  }
);

// Enroll in a course
router.post(
  '/courses/:id/enroll',
  authMiddleware.requireStudent,
  async (req, res, next) => {
    try {
      const courseId = req.params.id;
<<<<<<< HEAD
      const userId = req.session.currentUser._id;

      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).render('error', { error: 'Course not found' });
      }
=======
      const userId = req.user._id;
>>>>>>> 5ca14bfa3aa563bd089a6b1a887d7d6f14a39df6

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).render('error', { error: 'User not found' });
      }

      if (user.enrolledCourses.includes(courseId)) {
<<<<<<< HEAD
        res.send("You're already enlisted in this course ");
=======
        return res
          .status(400)
          .render('error', { error: 'Already enrolled in the course' });
>>>>>>> 5ca14bfa3aa563bd089a6b1a887d7d6f14a39df6
      }

      user.enrolledCourses.push(courseId);
      await user.save();

<<<<<<< HEAD
      console.log(user.enrolledCourses);

      res.redirect('/student/dashboard');
=======
      res.redirect(`/courses/${courseId}`);
>>>>>>> 5ca14bfa3aa563bd089a6b1a887d7d6f14a39df6
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;

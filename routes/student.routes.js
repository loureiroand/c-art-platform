const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Course = require('../models/Course.model');
const User = require('../models/User.model');

// Display enrolled courses
router.get(
  '/student/dashboard',
  authMiddleware.requireStudent,
  async (req, res, next) => {
    try {
      const userId = req.session.currentUser._id;

      const user = await User.findById(userId).populate('enrolledCourses');

      if (!user) {
        return res.status(404).render('error', { error: 'User not found' });
      }

      const enrolledCourses = user.enrolledCourses;

      res.render('students/student-dashboard', {
        enrolledCourses,
        currentUser: user
      });
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
      const userId = req.session.currentUser._id;

      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).render('error', { error: 'Course not found' });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).render('error', { error: 'User not found' });
      }

      if (user.enrolledCourses.includes(courseId)) {
        res.send("You're already enlisted in this course ");
      }

      user.enrolledCourses.push(courseId);
      await user.save();

      console.log(user.enrolledCourses);

      res.redirect('/student/dashboard');
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;

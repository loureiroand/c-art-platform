const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Course = require('../models/Course.model');
const User = require('../models/User.model');

// Student Dashboard
router.get(
  '/student/dashboard',
  authMiddleware.requireStudent,
  async (req, res, next) => {
    try {
      res.render('students/student-dashboard');
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
      const userId = req.user._id;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).render('error', { error: 'User not found' });
      }

      if (user.enrolledCourses.includes(courseId)) {
        return res
          .status(400)
          .render('error', { error: 'Already enrolled in the course' });
      }

      user.enrolledCourses.push(courseId);
      await user.save();

      res.redirect(`/courses/${courseId}`);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Course = require('../models/Course.model');

// Instructor Dashboard route
router.get(
  '/instructor/dashboard',
  authMiddleware.requireInstructor,
  async (req, res, next) => {
    try {
      // Fetch the current logged in instructor's user ID
      const instructorUsername = req.session.currentUser.userName;

      // Find the instructor's courses based on their user ID
      const courses = await Course.find({ instructor: instructorUsername });

      // Render the instructor dashboard view with the instructor's courses
      res.render('instructors/instructor-dashboard', {
        instructorCourses: courses
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;

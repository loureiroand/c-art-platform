const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Course = require('../models/Course.model');

// Instructor Dashboard
router.get(
  '/instructor/dashboard',
  authMiddleware.requireInstructor,
  async (req, res, next) => {
    try {
      res.render('instructors/instructor-dashboard');
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Course = require('../models/Course.model');
const Student = require('../models/Student.model');

// GET student dashboard
router.get(
  '/dashboard',
  authMiddleware.requireStudent,
  async (req, res, next) => {
    try {
      const studentId = req.session.currentUser._id;

      // Fetch the enrolled courses for the student
      const student = await Student.findById(studentId).populate(
        'courses.course_id'
      );

      res.render('student/student-dashboard', {
        enrolledCourses: student.courses
      });
    } catch (error) {
      next(error);
    }
  }
);

// Enroll in a course (POST)
router.post(
  '/courses/:id/enroll',
  authMiddleware.requireStudent,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.session.currentUser._id;

      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).render('error', { error: 'Course not found' });
      }

      const student = await Student.findById(userId);
      if (!student) {
        return res.status(404).render('error', { error: 'Student not found' });
      }

      // Check if the student is already enrolled in the course
      const isEnrolled = student.courses.some(course =>
        course.course_id.equals(id)
      );
      if (isEnrolled) {
        return res
          .status(400)
          .render('error', { error: 'Already enrolled in the course' });
      }

      student.courses.push({
        course_id: course._id,
        course_title: course.title
      });
      await student.save();

      res.redirect('/students/student-dashboard'); // Redirect to the student's dashboard page
    } catch (error) {
      next(error);
    }
  }
);

// GET enrolled courses
router.get(
  '/courses/enrolled',
  authMiddleware.requireStudent,
  async (req, res, next) => {
    try {
      const studentId = req.session.currentUser._id;

      // Fetch the enrolled courses for the student
      const student = await Student.findById(studentId).populate(
        'courses.course_id'
      );

      res.render('students/student-courses', {
        enrolledCourses: student.courses
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

const express = require('express');
const router = express.Router();
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
    }
  }
);

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
    }
  }
);

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

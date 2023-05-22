const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Course = require('../models/Course.model');
const fileUpload = require('../config/cloudinary');

// get courses
router.get('/courses', async (req, res, next) => {
  try {
    const courses = await Course.find();
    res.render('courses/course-index', { courses: courses });
  } catch (err) {
    next(err);
  }
});

router.get(
  '/courses/create',
  authMiddleware.requireInstructor,
  async (req, res, next) => {
    try {
      const newCourse = await Course.find();
      res.render('courses/course-create');
    } catch (error) {
      next(err);
    }
  }
);

// Create new course
router.post(
  '/courses',
  authMiddleware.requireInstructor,
  fileUpload.single('image'),
  async (req, res, next) => {
    let fileUrlOnCloudinary = '';
    if (req.file) {
      fileUrlOnCloudinary = req.file.path;
    }
    try {
      const { title, description, instructor } = req.body;
      await Course.create({
        title,
        description,
        instructor,
        imageUrl: fileUrlOnCloudinary
      });
      res.redirect('courses');
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
);

//Courses details
router.get('/courses/:id', async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    res.render('courses/course-details', course);
  } catch (err) {
    next(err);
  }
});

// Edit course
router.get(
  '/courses/:id/edit',
  authMiddleware.requireInstructor,
  async (req, res, next) => {
    try {
      const course = await Course.findById(req.params.id);

      res.render('courses/course-edit', course);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/courses/:id',
  authMiddleware.requireInstructor,
  fileUpload.single('image'),
  async (req, res, next) => {
    let fileUrlOnCloudinary = '';
    if (req.file) {
      fileUrlOnCloudinary = req.file.path;
    }
    const { title, description } = req.body;
    try {
      // Find the course by ID and update it
      const course = await Course.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          imageUrl: fileUrlOnCloudinary
        },

        { new: true } // Return the updated document
      );

      if (!course) {
        return res.status(404).render('error', { error: 'Course not found' });
      }

      res.redirect('/courses');
    } catch (error) {
      next(error);
    }
  }
);

/* router.post(
  '/courses/:id',
  authMiddleware.requireInstructor,
  async (req, res, next) => {
    const { title, description, instructor, rating, lessons } = req.body;
    try {
      // Find the course by ID
      const course = await Course.findByIdAndUpdate(req.params.id);
      if (!course) {
        return res.status(404).render('error', { error: 'Course not found' });
      }

      /*   course.description = description; if (!course.instructor?.equals(instructor)) {
        return res.status(403).render('error', { error: 'Forbidden' });
      } */
/*  course.title = title;
      course.description = description;
      course.instructor = instructor;
      course.rating = rating;
      course.lessons = lessons;

      res.redirect('/courses');
    } catch (error) {
      next(error);
    }
  }
);  */

/* router.post(
  '/courses/:id',
  authMiddleware.requireInstructor,
  async (req, res, next) => {
    try {
      const { title, description, instructor, rating, lessons } = req.body;
      await Course.findByIdAndUpdate(req.query.id, {
        title,
        description,
        instructor,
        $ 
        rating,
        lessons
      });
      res.redirect(`/courses/${req.query.id}`);
    } catch (err) {
      next(err);
    }
  }
); */

// Get lessons
router.get('/courses/:id/lessons', async (req, res, next) => {
  try {
    const coursesLessons = await Course.findById(req.params.id);
    res.render('courses/course-lessons', { coursesLessons });
  } catch (err) {
    next(err);
  }
});

router.get('/courses/:id/lessons/:lesson_id', async (req, res, next) => {
  try {
    const courses = await Course.findById(req.params.id);
    const lesson = Course.lessons.find(
      lesson => lesson._id.toString() === req.params.lesson_id
    );
    res.render('courses/course-lesson', { courses: courses, lesson: lesson });
  } catch (err) {
    next(err);
  }
});

router.get(
  '/courses/:id/delete',
  authMiddleware.requireInstructor,
  async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.redirect('/courses');
  }
);

module.exports = router;

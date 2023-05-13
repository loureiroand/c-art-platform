const express = require('express');
const router = express.Router();

const Course = require('../models/Course.model');

/* GET home page */
router.get('/', async (req, res, next) => {
  try {
    const courses = await Course.find().limit(3);
    res.render('index', { courses });
  } catch (err) {
    next(err);
  }
});

//   const currentUser = req.session.currentUser;
//   res.render('index', { currentUser });
// });

module.exports = router;

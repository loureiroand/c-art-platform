const router = require('express').Router();
const User = require('../models/User.model');
const bcrypt = require('bcryptjs');

router.get('/signup', async (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', async (req, res) => {
  const { username, email, password, accountType } = req.body;

  if (username === '' || email === '' || password === '') {
    res.render('auth/signup', { errorMessage: 'Fill in all fields' });
    return;
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res.render('auth/signup', { errorMessage: 'Username already exists' });
    return;
  }

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  let user;
  if (accountType === 'isStudent') {
    user = new User({
      username,
      email,
      password: hashedPassword,
      accountType: {
        isStudent: true,
        isInstructor: false
      }
    });
  } else if (accountType === 'isInstructor') {
    user = new User({
      username,
      email,
      password: hashedPassword,
      accountType: {
        isStudent: false,
        isInstructor: true
      }
    });
  }

  try {
    await user.save(); // Save the user to the database
    res.redirect('/');

    // Redirect the user to their respective dashboard based on their accountType
    if (accountType === 'isStudent') {
      res.redirect('students/student-dashboard');
    } else if (accountType === 'isInstructor') {
      res.redirect('instructors/instructor-dashboard');
    }
  } catch (error) {
    console.error(error);
    res.render('auth/signup', { errorMessage: 'Failed to create user' });
  }
});

router.get('/login', async (req, res) => {
  res.render('auth/login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.render('auth/login', { errorMessage: 'Invalid login' });
    return;
  }

  const user = await User.findOne({ username });

  if (!user) {
    res.render('auth/login', { errorMessage: 'Invalid login' });
    return;
  }

  // Check for password
  if (bcrypt.compareSync(password, user.password)) {
    // Passwords match
    req.session.currentUser = user;

    // Redirect the user to their respective dashboard based on their accountType
    if (user.accountType.isStudent) {
      res.redirect('/student/dashboard');
    } else if (user.accountType.isInstructor) {
      res.redirect('/instructor/dashboard');
    }
  } else {
    // Passwords don't match
    res.render('auth/login', { errorMessage: 'Invalid login' });
    return;
  }
});

router.get('/logout', async (req, res) => {
  // Clear the user's session
  req.session.destroy();

  // Redirect the user to the login page
  res.redirect('/login');
});

module.exports = router;

/* 
router.get('/signup', async (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', async (req, res) => {
  const { username, email, password, accountType } = req.body;

  if (username === '' || email === '' || password === '') {
    res.render('auth/signup', { errorMessage: 'Fill in all fields' });
    return;
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res.render('auth/signup', { errorMessage: 'Username already exists' });
    return;
  }

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  let user;
  if (accountType === 'isStudent') {
    user = new User({
      username,
      email,
      password: hashedPassword,
      accountType: {
        isStudent: true,
        isInstructor: false
      }
    });
  } else if (accountType === 'isInstructor') {
    user = new User({
      username,
      email,
      password: hashedPassword,
      accountType: {
        isStudent: false,
        isInstructor: true
      }
    });
  }

  try {
    await user.save(); // Save the user to the database
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.render('auth/signup', { errorMessage: 'Failed to create user' });
  }
});

router.get('/login', async (req, res) => {
  res.render('auth/login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.render('auth/login', { errorMessage: 'Invalid login' });
    return;
  }

  const user = await User.findOne({ username });

  if (!user) {
    res.render('auth/login', { errorMessage: 'Invalid login' });
    return;
  }

  // Check for password
  if (bcrypt.compareSync(password, user.password)) {
    // Passwords match
    req.session.currentUser = user;
    console.log(req.session.currentUser);
    res.redirect('/');
  } else {
    // Passwords don't match
    res.render('auth/login', { errorMessage: 'Invalid login' });
    return;
  }
});

module.exports = router; */

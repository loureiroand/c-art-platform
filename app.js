// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config();

// ℹ️ Connects to the database
require('./db');
const flash = require('connect-flash');
const passport = require('passport');
const helpers = require('handlebars-helpers');
const session = require('express-session');
const mongoStore = require('connect-mongo');

const authMiddleware = require('./middleware/authMiddleware');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

// Added helpers because I want to use
// the #eq helper
hbs.registerHelper(helpers());

app.use(
  session({
    resave: true,
    saveUinitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
      sameSite: true, //fe and be are running on localhost
      httpOnly: true, // we are not using https
      maxAge: 600000 // session time in milliseconds
    },
    rolling: true,
    store: new mongoStore({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 60 * 60 * 24 //1day
    })
  })
);

// Connect-Flash
app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

function getCurrentLoggedUser(req, res, next) {
  if (req.session && req.session.currentUser) {
    const currentUser = req.session.currentUser;
    res.locals.currentUser = {
      ...currentUser,
      isStudent: currentUser.role === 'student',
      isInstructor: currentUser.role === 'instructor'
    };
  } else {
    res.locals.currentUser = '';
  }
  req.session.save(); // Save changes to the session
  next();
}

// Use the middleware
app.use(getCurrentLoggedUser);

// default value for title local
const capitalize = require('./utils/capitalize');
const projectName = 'c-art-platform';

// app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;
app.locals.appTitle = 'c-art platform';

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes');
app.use('/', indexRoutes);

// const usersRoutes = require('./routes/users.routes');
// app.use('/', usersRoutes);

const coursesRoutes = require('./routes/courses.routes');
app.use('/', coursesRoutes);

const instructorRoutes = require('./routes/instructor.routes');
app.use('/', instructorRoutes);

const studentRoutes = require('./routes/student.routes');
app.use('/', studentRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/', userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;

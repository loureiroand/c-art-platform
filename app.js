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

const expressValidator = require('express-validator');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const helpers = require('handlebars-helpers');
const session = require('express-session');
const mongoStore = require('connect-mongo');

const expressValidator = require('express-validator');
const flash = require('connect-flash');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const helpers = require('handlebars-helpers');
const session = require('express-session');
const mongoStore = require('connect-mongo');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);
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
      maxAge: 60000 // session time in milliseconds
    },
    rolling: true,
    store: new mongoStore({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 60 * 60 * 24 //1day
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Express Validator
// indicates the specific field that has errors
// expressValidator({
//   errorFormatter: function (param, msg, value) {
//     const namespace = param.split('.'),
//       root = namespace.shift(),
//       formParam = root;

//     while (namespace.length) {
//       formParam += '[' + namespace.shift() + ']';
//     }
//     return {
//       param: formParam,
//       msg: msg,
//       value: value
//     };
//   }
// });

// Connect-Flash
app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(passport.initialize());
app.use(passport.session());

// Express Validator
// indicates the specific field that has errors
/* app.use(
  expressValidator({
    errorFormatter: function (param, msg, value) {
      var namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
); */

app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//custom middleware to get the current logged user
function getCurrentLoggedUser(req, res, next) {
  if (req.session && req.session.currentUser) {
    app.locals.currentUser = req.session.currentUser;
  } else {
    app.locals.currentUser = '';
  }
  next();
}

// use the middleware
app.use(getCurrentLoggedUser);

/* app.use(authMiddleware.requireInstructor);
app.use(authMiddleware.requireStudent); */

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

const userRoutes = require('./routes/user.routes');
app.use('/', userRoutes);

// const instructorRoutes = require('./routes/instructor.routes');
// app.use('/', instructorRoutes);
const coursesRoutes = require('./routes/courses.routes');
app.use('/', coursesRoutes);

const instructorRoutes = require('./routes/instructor.routes');
app.use('/', instructorRoutes);

const studentRoutes = require('./routes/student.routes');
app.use('/', studentRoutes);

// const studentRoutes = require('./routes/student.routes');
// app.use('/', studentRoutes);
const userRoutes = require('./routes/user.routes');
app.use('/', userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;

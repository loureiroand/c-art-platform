// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config();

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require('hbs');

// Added helpers because I want to use
// the #eq helper
const helpers = require('handlebars-helpers');
hbs.registerHelper(helpers());

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);

const session = require('express-session');
const mongoStore = require('connect-mongo');
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

// default value for title local
const capitalize = require('./utils/capitalize');
const projectName = 'library-project';

// app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;
app.locals.appTitle = 'Library App';

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes');
app.use('/', indexRoutes);

const bookRoutes = require('./routes/book.routes');
app.use('/', bookRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/', authRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;

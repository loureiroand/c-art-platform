// Middleware
function requireInstructor(req, res, next) {
  if (
    req.session.currentUser &&
    req.session.currentUser.accountType.isInstructor
  ) {
    next();
  } else {
    res.redirect('/login');
  }
}

function requireStudent(req, res, next) {
  if (
    req.session.currentUser &&
    req.session.currentUser.accountType.isStudent
  ) {
    next();
  } else {
    res.redirect('/login');
  }
}

module.exports = { requireInstructor, requireStudent };

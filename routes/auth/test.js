var express = require('express');
var router = express.Router();

var utils = require('../../utils');

var models = require('../../models');
var User = models.User;

function invalid_type(req, res, next) {
  res.status(401).send('Invalid request type');
}

login_handler = function(req, res, next) {
  var email = req.body.email;

  req.session.currentUser = email;
  console.log('Welcoming ' + email);
  res.send('Welcome ' + req.session.currentUser);
};

logout_handler = function(req, res, next) {
  req.session.currentUser = null;
  req.session.destroy(function(err) {
    res.send('Logged out');
  });
};


router.get('/login', login_handler);
router.get('/logout', logout_handler);

router.post('/login', login_handler);
router.post('/logout', logout_handler);

router.buttons = {
  login: "onclick='javascript: login_prompt_test(); return false;'",
  logout: "onclick='javascript: logout_test(); return false;'"
};

router.middleware = function(req, res, next) {
  res.locals.extra_js.push('/javascripts/login-test.js');
  next();
};

module.exports = router;

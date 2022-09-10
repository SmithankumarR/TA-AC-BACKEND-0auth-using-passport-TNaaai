var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Success. */
router.get('/success', function (req, res, next) {
  res.render('success');
});
router.get('/success_google', function (req, res, next) {
  res.render('success_google');
});

/* Failure. */
router.get('/failure', function (req, res, next) {
  res.render('failure');
});
router.get('/failure_google', function (req, res, next) {
  res.render('failure_google');
});

//passport github route

router.get('/auth/github', passport.authenticate('github'));

router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/failure',
  }),
  function (req, res) {
    //success redirect
    res.redirect('/success');
  }
);

//passport google route

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/failure_google' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/success_google');
  }
);

module.exports = router;
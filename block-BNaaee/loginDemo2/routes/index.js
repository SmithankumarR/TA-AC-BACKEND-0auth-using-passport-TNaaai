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

/* Failure. */
router.get('/failure', function (req, res, next) {
  res.render('failure');
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
  passport.authenticate('google', { failureRedirect: '/failure' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/success');
  }
);

module.exports = router;
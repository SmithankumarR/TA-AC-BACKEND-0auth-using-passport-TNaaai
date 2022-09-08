var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// indication of final results
router.get('/success' ,(req,res,next) => {
  let user = req.user;
  res.render('success', { user });
})
router.get('/failure', (req,res,next) => {
  let user = req.user;
  res.render('failure', { user });
})

// this is for github

router.get('/auth/github', passport.authenticate('github'));
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/failure'}),(req, res) => {
    res.redirect('/success');
  });


  // this is for google

  router.get('/auth/google', passport.authenticate('google', { scope: ['email','profile'] }));
  router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect : '/failure'}), (req,res) => {
    res.redirect('/success');
  })


module.exports = router;

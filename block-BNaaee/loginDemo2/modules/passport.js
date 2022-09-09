var passport = require('passport');
var User = require('../models/user');
var GitHubStrategy = require('passport-github').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

// github strategy

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      var userData = {
        name: profile.displayName,
        username: profile.username,
        image: profile._json.avatar_url,
        email: profile.profileUrl,
      };
      User.findOne({ email: profile.profileUrl }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          User.create(userData, (err, createdUser) => {
            if (err) return done(err);
            return done(null, createdUser);
          });
        }
        done(null, user);
      });
    }
  )
);

// google Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: '/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      var userData = {
        name: profile._json.given_name + '' + profile._json.family_name,
        username: profile._json.name,
        image: profile._json.avatar_url,
        email: profile._json.sub,
        photo: profile._json.picture,
      };
      console.log('google UserData', userData);
      User.findOne({ email: profile._json.sub }, (err, user) => {
        if (err) return done(err);
        if (!user) {
          User.create(userData, (err, created) => {
            if (err) return done(err);
            console.log('google user created', created);
            return done(null, created);
          });
        }
        done(null, user);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

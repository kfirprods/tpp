var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require("./models").User;

var router = express.Router();

// ==========
// Passport configuration
// ==========
passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log("Getting user by creds...");
        User.getUserByCredentials(username, password, function(err, user) {
            if (!user) {
                return done(null, false, {message: 'Incorrect username or password.'});
            }
            else {
                return done(null, user);
            }
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

router.post('/login',
    passport.authenticate('local',
        {
            // TODO: Replace redirect with returning JSON data
            successRedirect: '/',
            failureRedirect: '/loginFailed'
        })
);

module.exports = router;

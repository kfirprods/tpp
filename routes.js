var express = require('express');
var expressValidation = require('express-validation');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var validators = require("./validators");
var User = require("./models").User;
var authController = require("./controllers/auth");
var projectController = require("./controllers/project");

var router = express.Router();

// ==========
// Passport configuration
// ==========
passport.use(new LocalStrategy(
    function(username, password, done) {
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

// ==========
// Authentication API
// ==========
function isAuthenticatedMiddleware(req,res,next){
    if(req.user)
        return next();
    else
        return res.status(401).json({
            error: 'User not authenticated'
        });
}


router.post('/login', expressValidation(validators.login), authController.login);
router.post('/register', expressValidation(validators.register), authController.register);

// Get all projects related to the logged in user
router.get("/projects", isAuthenticatedMiddleware, projectController.getUserProjects);
// Get a specific project by id
router.get("/projects/:projectId", isAuthenticatedMiddleware, projectController.getProjectById);
// Create new project
router.post(
    "/projects",
    [isAuthenticatedMiddleware, expressValidation(validators.project)],
    projectController.createProject
);
// Update existing project
router.post(
    "/projects/:projectId",
    [isAuthenticatedMiddleware, expressValidation(validators.project)],
    projectController.updateProject);
// Delete existing project
router.delete("/projects/:projectId", isAuthenticatedMiddleware, projectController.deleteProject);


module.exports = router;

const express = require('express');
const expressValidation = require('express-validation');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const validators = require("./validators");
const User = require("./models").User;
const authController = require("./controllers/auth");
const projectController = require("./controllers/project");
const ruleController = require("./controllers/rule");
const userController = require("./controllers/user");
const utilityController = require("./controllers/utility");

const router = express.Router();

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

router.get('/me', isAuthenticatedMiddleware, userController.getCurrentUser);
router.get('/users', userController.getAllUsernames);

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
// Clone project and get file names
router.post(
    "/projects/:projectId/preprocess",
    isAuthenticatedMiddleware,
    projectController.preprocessProject);
// Process a single project file
router.post(
    "/projects/:projectId/processfile",
    isAuthenticatedMiddleware,
    projectController.processFile);

// Get all rules (not just user-related ones)
router.get("/rules", ruleController.getAllRules);
// Get rule by id
router.get("/rules/:ruleId", ruleController.getRuleById);
// Get rule categories (collected from all rules)
router.get("/rule-categories", ruleController.getRuleCategories);
// Get rule types (from constants)
router.get("/rule-types", ruleController.getRuleTypes);
// Create rule
router.post("/rules", [isAuthenticatedMiddleware, expressValidation(validators.rule)], ruleController.createRule);
// Delete existing rule
router.delete("/rules/:ruleId", ruleController.deleteRule);

router.get("/utility/repository-exists", utilityController.repositoryExists);
router.get("/utility/repository-branches", utilityController.listRemoteBranches);

module.exports = router;

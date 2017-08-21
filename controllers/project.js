var Project = require("../models").Project;
var constants = require("../consts");


module.exports.getUserProjects = function(req, res, next) {
    Project.getProjectsByUsername(req.user.username, function (err, projects) {
        if (err) {
            console.log("getProjectsByUsername error:", err);
            res.sendStatus(500);
        }
        else {
            res.json(projects);
        }
    });
};

module.exports.getProjectById = function(req, res, next) {
    Project.getProjectById(req.params.projectId, function(err, project) {
        // If the user has no permission at all
        if (!project.userPermissions.some(permission => permission.username == req.user.username)) {
            res.sendStatus(401);
        }
        else {
            res.json(project);
        }
    });
};

module.exports.createProject = function(req, res, next) {
    // Add the creating user to the permission list
    var permissionsIncludingUser = [...req.body.userPermissions,
        {username: req.user.username, permission: constants.PROJECT_USER_PERMISSIONS.FULL}];

    Project.createProject(req.body.title, req.body.rules, permissionsIncludingUser, function(err, project) {
        if (err) {
            console.log("createProject error:", err);
            res.sendStatus(500);
        }
        else {
            res.sendStatus(200);
        }
    });
};

module.exports.updateProject = function(req, res, next) {
    Project.getProjectById(req.params.projectId, function(err, project) {
        if (!project) {
            res.sendStatus(400);
            return;
        }

        var userPermissions = project.userPermissions.filter(item => item.username == req.user.username);

        if (!userPermissions.length) {
            res.sendStatus(401);
        }
        else {
            // One needs full permissions to edit other users permissions
            if (userPermissions[0].permission != constants.PROJECT_USER_PERMISSIONS.FULL &&
                req.body.userPermissions.length) {
                res.sendStatus(401);
            }
            else {
                Project.updateProject(
                    req.params.projectId,
                    req.body.title,
                    req.body.rules,
                    req.body.userPermissions,
                    function (err) {
                        if (err) {
                            console.log("updateProject error:", err);
                            res.sendStatus(500);
                        }
                        else {
                            res.sendStatus(200);
                        }
                    }
                );
            }
        }
    });
};

module.exports.deleteProject = function (req, res, next) {
    Project.getProjectById(req.params.projectId, function(err, project) {
        if (!project) {
            res.sendStatus(400);
            return;
        }

        // One would need full permissions to delete the project
        var userPermissions = project.userPermissions.filter(
            item => item.username == req.user.username && item.permission == constants.PROJECT_USER_PERMISSIONS.FULL);

        if (!userPermissions.length) {
            res.sendStatus(401);
        }
        else {
            Project.deleteProject(
                req.params.projectId,
                function (err) {
                    if (err) {
                        console.log("deleteProject error:", err);
                        res.sendStatus(500);
                    }
                    else {
                        res.sendStatus(200);
                    }
                }
            );
        }
    });
};

const { spawn } = require('child_process');
const fs = require('fs');
// const Hg = require('hg-plus')();
const recursiveDir = require('recursive-readdir');
const moment = require('moment');

const Project = require("../models").Project;
const constants = require("../consts");


module.exports.getUserProjects = function(req, res) {
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

module.exports.getProjectById = function(req, res) {
    Project.getProjectById(req.params.projectId, function(err, project) {
        // If the user has no permission at all
        if (!project.userPermissions.some(permission => permission.username === req.user.username)) {
            res.sendStatus(401);
        }
        else {
            res.json(project);
        }
    });
};

module.exports.createProject = function(req, res) {
    // Add the creating user to the permission list
    let permissionsIncludingUser = [...req.body.userPermissions,
        {username: req.user.username, permission: constants.PROJECT_USER_PERMISSIONS.FULL}];

    Project.createProject(
        req.body.title,
        req.body.rules,
        permissionsIncludingUser,
        req.body.repository,
        moment().unix(), // unix time
        function(err, project) {
            if (err) {
                console.log("createProject error:", err);
                res.sendStatus(500);
            }
            else {
                res.json(project);
            }
        }
    );
};

module.exports.updateProject = function(req, res) {
    Project.getProjectById(req.params.projectId, function(err, project) {
        if (!project) {
            console.log("Could not find project by id", req.params.projectId);
            res.sendStatus(400);
            return;
        }

        let userPermissions = project.userPermissions.filter(item => item.username === req.user.username);

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
                    req.body.repository,
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

module.exports.deleteProject = function (req, res) {
    Project.getProjectById(req.params.projectId, function(err, project) {
        if (!project) {
            res.sendStatus(400);
            return;
        }

        // One would need full permissions to delete the project
        let userPermissions = project.userPermissions.filter(
            item => item.username === req.user.username && item.permission === constants.PROJECT_USER_PERMISSIONS.FULL);

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

module.exports.preprocessProject = function(req, res) {
    Project.getProjectById(req.params.projectId, function(err, project) {
        if (!project) {
            res.sendStatus(400);
            return;
        }

        // Verify that the user has any permissions
        let userPermissions = project.userPermissions.filter(item => item.username === req.user.username);

        if (!userPermissions.length) {
            res.sendStatus(401);
        }
        else {
            // TODO: Use better path
            let projectPath = "C:\\tpp_projects_cache\\" + project._id + "\\repo\\";

            let returnFilePaths = function() {
                recursiveDir(projectPath, [".hgignore", ".hg\\*"], function(err, projectFiles) {
                    res.json(
                        projectFiles.map(
                            function (projectFile) {
                                return projectFile.replace(projectPath, "");
                            }
                        )
                    );
                });
            };

            fs.mkdir(projectPath, function(err) {
                // If the directory did not already exist
                if (!err || err.code !== 'EEXIST') {
                    let repositoryPath = projectPath + "\\repo";
                    console.log("Cloning a repository to " + repositoryPath);

                    // Clone
                    Hg.clone(
                        project.repository.address,
                        {
                            url: project.repository.address,
                            path: repositoryPath,
                            username: project.repository.username,
                            password: project.repository.password
                        }
                    ).then(function(repo) {
                        // After cloning, update to most recent default
                        // TODO: Verify that the comment above is reliable!
                        repo.update({clean: true}, function() {
                            returnFilePaths();
                        });
                    });
                }
                // If the directory already exists
                else {
                    returnFilePaths();
                }
            });
        }
    });
};

module.exports.processFile = function(req, res) {
    Project.getProjectById(req.params.projectId, function(err, project) {
        if (!project) {
            res.sendStatus(400);
            return;
        }

        // Verify that the user has any permissions
        let userPermissions = project.userPermissions.filter(item => item.username === req.user.username);

        if (!userPermissions.length) {
            res.sendStatus(401);
        }
        else {
            // Validate existence of req.body.filename
            fs.access(req.body.filename, fs.constants.R_OK, (err) => {
                if (err) {
                    // Return 400 if non existent
                    res.sendStatus(400);
                }
                else {
                    _processFile(project, req.body.filename, function (requiredValidations) {
                        res.json(requiredValidations);
                    });
                }
            });
        }
    });
};

function _processFile(project, filePath, callback) {
    let python = spawn("python", ["python/main.py", filePath]);
    let allReturnedData = "";

    python.stdout.on("data", function (data) {
        allReturnedData += data.toString();
    });

    python.stdout.on("end", function () {
        let processorResult = JSON.parse(allReturnedData.toString());
        console.log("Python finished:", processorResult);
        callback(processorResult.validations);
    });

    python.stderr.on("data", function (data) {
        console.log("Python Error!", data.toString());
    });

    // Feed the script with the project rules
    python.stdin.write(JSON.stringify(project.rules));
    python.stdin.end();
}

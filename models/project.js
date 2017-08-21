var mongoose = require('mongoose');

var userProjectPermissionSchema = mongoose.Schema({
    username: String,
    permission: String
});

var projectSchema = mongoose.Schema({
    title: String,
    rules: [mongoose.Schema.Types.ObjectId],
    userPermissions: [userProjectPermissionSchema]
});

var Project = module.exports = mongoose.model('Project', projectSchema);
module.exports.createProject = function(title, rules, permissions, callback) {
    Project.create({title: title, rules: rules, userPermissions: permissions }, callback);
};

module.exports.updateProject = function(projectId, title, rules, permissions, callback) {
    Project.findOne({_id: projectId}, function(err, project) {
        if (err) {
            callback(err, null);
            return;
        }

        if (permissions && permissions.length > 0) {
            var newFullPermCount = permissions.filter(
                perm => perm.permission == constants.PROJECT_USER_PERMISSIONS.FULL
            ).length;
            if (newFullPermCount == 0) {
                callback({message: "There must be at least 1 full-permissioned user at all times"}, null);
                return;
            }
            else {
                project.userPermissions = permissions;
            }
        }

        if (title)
            project.title = title;

        if (rules)
            project.rules = rules;

        project.save();

        callback(null, project);
    });
};

module.exports.getProjectsByUsername = function(username, callback) {
    Project.find({ userPermissions: { $elemMatch: { username: username }}}, callback);
};

module.exports.getProjectById = function(projectId, callback) {
    Project.findOne({ _id: projectId }, callback);
};

module.exports.deleteProject = function(projectId, callback) {
    Project.remove({ _id: projectId }, callback);
};

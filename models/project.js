const mongoose = require('mongoose');

let userProjectPermissionSchema = mongoose.Schema({
    username: String,
    permission: String
});

let repositorySchema = mongoose.Schema({
    address: String,
    username: {type: String, required: false, default: '', validate: /^$|\S+/ },
    password: {type: String, required: false, default: '', validate: /^$|\S+/ },
    sourceBranch: {type: String, required: false, default: 'default'},
    targetBranch: {type: String, required: false, default: 'default'}
});

let projectSchema = mongoose.Schema({
    title: String,
    rules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rule' }],
    userPermissions: [userProjectPermissionSchema],
    repository: repositorySchema,
    creationTime: Number
});

let Project = module.exports = mongoose.model('Project', projectSchema);
module.exports.createProject = function(title, rules, permissions, repository, creationTime, callback) {
    Project.create({
        title: title,
        rules: rules,
        userPermissions: permissions,
        repository: repository,
        creationTime: creationTime
    }, callback);
};

module.exports.updateProject = function(projectId, title, rules, permissions, repository, callback) {
    Project.findOne({_id: projectId}, function(err, project) {
        if (err) {
            callback(err, null);
            return;
        }

        if (permissions && permissions.length > 0) {
            let newFullPermCount = permissions.filter(
                perm => perm.permission === constants.PROJECT_USER_PERMISSIONS.FULL
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

        if (repository)
            project.repository = repository;

        project.save();

        callback(null, project);
    });
};

module.exports.getProjectsByUsername = function(username, callback) {
    Project.find({ userPermissions: { $elemMatch: { username: username }}}, callback);
};

module.exports.getProjectById = function(projectId, callback) {
    Project.findOne({ _id: projectId }).populate("rules").exec(callback);
};

module.exports.deleteProject = function(projectId, callback) {
    Project.remove({ _id: projectId }, callback);
};

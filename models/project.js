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
// TODO: Export more functions here
module.exports.createProject = function(title, rules, permissions, callback) {
    Project.create({title: title, rules: rules, userPermissions: permissions }, callback);
};

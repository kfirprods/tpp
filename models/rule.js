var mongoose = require('mongoose');


var keyValueSchema = mongoose.Schema({
    key: String,
    value: mongoose.Schema.Types.Mixed
});

var ruleSchema = mongoose.Schema({
    title: String,
    ruleType: String,
    creatorUsername: String,
    ruleParameters: [keyValueSchema]
});

var Rule = module.exports = mongoose.model('Rule', ruleSchema);
// TODO: Export more functions here
module.exports.createRule = function(title, rules, permissions, callback) {
    Project.create({title: title, rules: rules, userPermissions: permissions }, callback);
};

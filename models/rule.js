var mongoose = require('mongoose');


var ruleSchema = mongoose.Schema({
    title: String,
    ruleType: String,
    creatorUsername: String,
    regularExpressions: [String]
});

var Rule = module.exports = mongoose.model('Rule', ruleSchema);

module.exports.createRule = function(title, ruleType, creatorUsername, regularExpressions, callback) {
    Rule.create({
        title: title,
        ruleType: ruleType,
        creatorUsername: creatorUsername,
        regularExpressions: regularExpressions
    }, callback);
};

module.exports.getAllRules = function(callback) {
    Rule.find({}, callback);
};

module.exports.getRuleById = function(ruleId, callback) {
    Rule.findOne({_id: ruleId}, callback);
};

module.exports.deleteRule = function(ruleId, callback) {
    Rule.remove({_id: ruleId}, callback);
};

const mongoose = require('mongoose');


let ruleSchema = mongoose.Schema({
    title: String,
    description: String,
    ruleType: String,
    creatorUsername: String,
    regularExpressions: [String],
    categories: [String]
});

const Rule = module.exports = mongoose.model('Rule', ruleSchema);

module.exports.createRule = function(title, description, ruleType, creatorUsername, regularExpressions, categories, callback) {
    Rule.create({
        title,
        description,
        ruleType,
        creatorUsername,
        regularExpressions,
        categories
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

module.exports.getCategories = function(query, callback) {
    let findQuery = {};
    if (query) {
        findQuery = { categories: { '$regex': query, '$options': 'i'} };
    }

    Rule.find(findQuery, function(err, rules) {
        if (err) {
            callback(err, []);
        }
        else {
            let categories = [];
            for (let rule of rules) {
                for (let category of rule.categories) {
                    if (categories.indexOf(category) === -1) {
                        categories.push(category);
                    }
                }
            }

            callback(null, categories);
        }
    });
};

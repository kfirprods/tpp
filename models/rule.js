const mongoose = require('mongoose');


let ruleSchema = mongoose.Schema({
    title: { type: String, unique: true },
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

module.exports.getRuleByTitle = function(title, callback) {
    Rule.findOne({
        title: {
            '$regex': '^' + title + '$',
            '$options': 'i'
        }
    }, callback);
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
            let upperCaseCategories = []; // We use a same-case array for case insensitivity
            for (let rule of rules) {
                for (let category of rule.categories) {
                    if (upperCaseCategories.indexOf(category.toUpperCase()) === -1) {
                        categories.push(category);
                        upperCaseCategories.push(category.toUpperCase());
                    }
                }
            }

            callback(null, categories);
        }
    });
};

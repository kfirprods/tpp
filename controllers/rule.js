const Rule = require("../models").Rule;
const constants = require("../consts");


module.exports.getAllRules = function(req, res) {
    if (req.query.q) {
        Rule.getRuleByTitle(req.query.q, function(err, rule) {
            res.json(rule);
        });
    }
    else {
        Rule.getAllRules(function (err, rules) {
            res.json(rules);
        });
    }
};

module.exports.getRuleById = function(req, res) {
    Rule.getRuleById(req.params.ruleId, function(err, rule) {
        res.json(rule);
    });
};

module.exports.getRuleCategories = function(req, res) {
    Rule.getCategories(req.query.q, function (err, categories) {
        res.json(categories);
    });
};

module.exports.getRuleTypes = function(req, res) {
    res.json(Object.values(constants.RULE_TYPES));
};

module.exports.createRule = function(req, res) {
    Rule.getRuleByTitle(req.body.title, function(err, rule) {
        // Title taken
        if (rule !== null) {
            res.status(400).json({ message: 'The title is in use' });
        }
        // Title available
        else {
            Rule.createRule(
                req.body.title,
                req.body.description,
                req.body.ruleType,
                req.user.username,
                req.body.regularExpressions,
                req.body.categories,
                function(err, createdRule) {
                    res.json(createdRule);
                }
            );
        }
    });
};

module.exports.deleteRule = function(req, res) {
    Rule.getRuleById(req.params.ruleId, function(err, rule) {
        if (rule.creatorUsername != req.user.username) {
            console.log(req.creatorUsername, "!=", req.user.username);
            res.sendStatus(401);
        }
        else {
            Rule.deleteRule(req.params.ruleId, function() {
               res.sendStatus(200);
            });
        }
    });
};

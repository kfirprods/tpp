const Rule = require("../models").Rule;
const constants = require("../consts");


module.exports.getAllRules = function(req, res) {
    Rule.getAllRules(function(err, rules) {
        res.json(rules);
    });
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
    Rule.createRule(
        req.body.title,
        req.body.description,
        req.body.ruleType,
        req.user.username,
        req.body.regularExpressions,
        req.body.categories,
        function() {
            res.sendStatus(200);
        }
    );
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

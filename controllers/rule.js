var Rule = require("../models").Rule;


module.exports.getAllRules = function(req, res, next) {
    Rule.getAllRules(function(err, rules) {
        res.json(rules);
    });
};

module.exports.getRuleById = function(req, res, next) {
    Rule.getRuleById(req.params.ruleId, function(err, rule) {
        res.json(rule);
    });
};

module.exports.createRule = function(req, res, next) {
    Rule.createRule(
        req.body.title,
        req.body.ruleType,
        req.user.username,
        req.body.regularExpressions,
        function(err, createdRule) {
            res.sendStatus(200);
        }
    );
};

module.exports.deleteRule = function(req, res, next) {
    Rule.getRuleById(req.params.ruleId, function(err, rule) {
        if (rule.creatorUsername != req.user.username) {
            console.log(req.creatorUsername, "!=", req.user.username);
            res.sendStatus(401);
        }
        else {
            Rule.deleteRule(req.params.ruleId, function(err, rule) {
               res.sendStatus(200);
            });
        }
    });
};

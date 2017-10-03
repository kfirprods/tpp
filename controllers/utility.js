const Hg = require('hg-plus')();


module.exports.repositoryExists = function(req, res, next) {
    Hg.identify(req.query.repositoryUrl).then(function(response) {
        res.json({success: true});
    }).catch(function(error) {
        res.json({success: false});
    });
};

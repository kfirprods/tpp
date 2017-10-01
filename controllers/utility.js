const Hg = require('hg-plus')();


module.exports.repositoryExists = function(req, res, next) {
    Hg.identify(req.query.repositoryUrl).then(function(response) {
        console.log("identify succeeded");
        res.json({success: true});
    }).catch(function(error) {
        console.log("identify failed");
        res.json({success: false});
    });
};

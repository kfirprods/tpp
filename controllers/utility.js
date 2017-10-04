const Hg = require('hg-plus')();
const { spawn } = require('child_process');


module.exports.repositoryExists = function(req, res, next) {
    Hg.identify(req.query.repositoryUrl).then(function(response) {
        res.json({success: true});
    }).catch(function(error) {
        res.json({success: false});
    });
};

module.exports.listRemoteBranches = function(req, res, next) {
    var python = spawn("C:\\python27\\python.exe", ["python/hg-rheads.py", req.query.repositoryUrl]);

    var allReturnedData = "";

    python.stdout.on("data", function (data) {
        allReturnedData += data.toString();
    });

    python.stdout.on("end", function () {
        if (allReturnedData) {
            var hashesAndBranchNames = allReturnedData.split(/\r?\n/);
            res.json(hashesAndBranchNames.map((line) => {
                let [hash, branchName] = line.split(' ');
                return {hash, branchName};
            }));
        }
    });

    python.stderr.on("data", function (data) {
        res.json({
            error: "Bad HG repository"
        });
        allReturnedData = "";
    });
};

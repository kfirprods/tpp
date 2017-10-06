const Hg = require('hg-plus')();
const { spawn } = require('child_process');


module.exports.repositoryExists = function(req, res) {
    Hg.identify(req.query.repositoryUrl).then(function() {
        res.json({success: true});
    }).catch(function() {
        res.json({success: false});
    });
};

module.exports.listRemoteBranches = function(req, res) {
    let python = spawn("C:\\python27\\python.exe", ["python/hg-rheads.py", req.query.repositoryUrl]);

    let allReturnedData = "";

    python.stdout.on("data", function (data) {
        allReturnedData += data.toString();
    });

    python.stdout.on("end", function () {
        if (allReturnedData) {
            let hashesAndBranchNames = allReturnedData.split(/\r?\n/);
            res.json(hashesAndBranchNames.map((line) => {
                let [hash, branchName] = line.split(' ');
                return {hash, branchName};
            }));
        }
    });

    python.stderr.on("data", function () {
        res.json({
            error: "Bad HG repository"
        });
        allReturnedData = "";
    });
};

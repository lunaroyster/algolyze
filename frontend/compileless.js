var fse   = require('fs-extra');
var path = require('path');
var less = require('less');
var Q = require('q');

function toCSS(lessFileName) {
    return lessFileName.replace(".less", ".css");
}

var render = ()=> {
    console.log("Compiling LESS files");
    var lessFolder = __dirname + "/less/";
    var outFolder = __dirname + "/generated/css/";
    return Q.fcall(()=> {
        return fse.readdirSync(lessFolder);
    })
    .then((lessFiles)=> {
        var filePromises = [];
        fse.ensureDirSync(outFolder);
        for (var lF in lessFiles) {
            var lessFile = lessFiles[lF];
            var filePromise = less.render(fse.readFileSync(lessFolder + lessFile).toString())
            .then((output)=> {
                var deferred = Q.defer();
                fse.writeFile(outFolder+toCSS(lessFile), output.css, {flag:'w'}, (error, output)=> {
                    deferred.resolve();
                    return;
                });
                return deferred.promise;
            });
            filePromises.push(filePromise);
        }
        return Q.all(filePromises);
    })
    .then(()=> {
        console.log("Compiled LESS files");
    });
};
render();

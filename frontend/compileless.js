const fse   = require('fs-extra');
const path = require('path');
const less = require('less');

function toCSS(lessFileName) {
    return lessFileName.replace(".less", ".css");
}

module.exports = (async (lessFolder, outFolder)=> {
    console.log("Compiling LESS");
    
    await fse.ensureDir(outFolder);
    
    let lessFileNames = await fse.readdir(lessFolder);
    for (let lessFileName of lessFileNames) {
        let lessFile = await less.render((await fse.readFile(lessFolder + lessFileName)).toString());
        await fse.writeFile(outFolder+toCSS(lessFileName), lessFile.css, {flag:'w'});
    }
    
    console.log("Compiled LESS");
});
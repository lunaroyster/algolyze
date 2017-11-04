const fse   = require('fs-extra');
const path = require('path');
const sass = require('node-sass');

function toCSS(scssFileName) {
    return scssFileName.replace(".scss", ".css");
}

module.exports = (async (scssFolder, outFolder)=> {
    console.log("Compiling SASS");
    
    await fse.ensureDir(outFolder);
    
    let scssFileNames = await fse.readdir(scssFolder);
    for (let scssFileName of scssFileNames) {
        let scssFile = await sass.renderSync({data: (await fse.readFile(scssFolder + scssFileName)).toString()});
        await fse.writeFile(outFolder+toCSS(scssFileName), scssFile.css, {flag:'w'});
    }
    
    console.log("Compiled SASS");
});
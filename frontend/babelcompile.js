const fse = require('fs-extra');
const babel = require('babel-core');

module.exports = (async (inFile, outFile)=> {
    
    let JSFile = (await fse.readFile(inFile)).toString();
    let JSOutput = babel.transform(JSFile, {presets:[["env", {targets:{browsers:['chrome 41']}}]]}).code;
    await fse.writeFile(outFile, JSOutput, {flag:'w'});
    
});

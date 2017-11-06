const fse = require('fs-extra');

module.exports = (async function() {
    console.log("Compiling data.");
    
    let dir = __dirname;
    await fse.emptyDir(`${dir}/generated/algorithms/`); 
        
    let algorithms = [];
    let algorithmNames = await fse.readdir(`${dir}/algorithms`);
    for(let algorithmName of algorithmNames) {
        let algorithmFile = await fse.readJSON(`${dir}/algorithms/${algorithmName}/main.json`);
        let algorithmPage;
        try {
            algorithmPage = await fse.readFile(`${dir}/algorithms/${algorithmName}/page.md`, 'utf8');
            algorithmFile.longDescription = algorithmPage;
        }
        catch (error) {
            console.log(error);
        }
        algorithms.push(algorithmFile);
    }
    await fse.outputJSON(`${dir}/generated/algorithms/compiled.json`, algorithms);
    
    await fse.copy(`${dir}/algorithms`, `${dir}/generated/algorithms`, {overwrite: false});
    
    console.log("Compiled data.");
})();
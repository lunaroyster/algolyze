const fse = require('fs-extra');
const sm = require('sitemap')

module.exports = (async function() {
    console.log("Compiling data.");
    
    let dir = __dirname;
    await fse.emptyDir(`${dir}/generated/algorithms/`);
    await fse.emptyDir(`${dir}/generated/sitemaps/`);
    
    let algorithms = [];
    let algorithmURLs = [];
    let algorithmNames = await fse.readdir(`${dir}/algorithms`);
    for(let algorithmName of algorithmNames) {
        let algorithmFile = await fse.readJSON(`${dir}/algorithms/${algorithmName}/main.json`);
        algorithmURLs.push(algorithmFile.url);
        try {
            let algorithmPage = await fse.readFile(`${dir}/algorithms/${algorithmName}/page.md`, 'utf8');
            algorithmFile.longDescription = algorithmPage;
        }
        catch (error) {
            console.log(error);
        }
        algorithms.push(algorithmFile);
    }
    await fse.outputJSON(`${dir}/generated/algorithms/compiled.json`, algorithms);
    
    await fse.copy(`${dir}/algorithms`, `${dir}/generated/algorithms`, {overwrite: false});
    
    let sitemap = sm.createSitemap({hostname: 'https://algolyze.me/a', urls: algorithmURLs});
    await fse.writeFile(`${dir}/generated/sitemaps/algorithms.xml`, sitemap.toXML(), 'utf8');
    
    console.log("Compiled data.");
})();
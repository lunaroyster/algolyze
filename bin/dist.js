#!/usr/bin/env node

const Q = require('q');
const fse = require('fs-extra');
const path = require('path');
const _ = require('underscore');

(async function() {
    let distDir = './dist';
    let staticDir = './frontend/static';
    let generatedDir = './frontend/generated';
    let algorithmsDir = './algorithms';
    return await (async()=> {
        //Ensure 'dist'
        return fse.emptyDir(distDir);
    })()
    .then(async ()=> {
        //Compile frontend
        return require('../frontend/index');
    })
    .then(async ()=> {
        //Copy static assets
        console.log("Copying static frontend assets");
        await fse.copy(staticDir, `${distDir}`, {overwrite: false});
        
        //Copy generated assets
        console.log("Copying generated frontend assets");
        await fse.copy(generatedDir, `${distDir}`, {overwrite: false});
        
        //Copy algorithms and markdown to dist
        console.log("Copying raw algorithm assets");
        await fse.copy(algorithmsDir, `${distDir}/algorithms/all`, {overwrite: false});
    })
    .then(async ()=> {
        //Compile algorithms and copy compiled versions
        console.log("Compiling pages and files");
        let algorithmFileNames = await fse.readdir(`${algorithmsDir}/files`);
        let algorithmPageNames = await fse.readdir(`${algorithmsDir}/pages`);
        let algorithmObjects = [];
        for(let algorithmFileName of algorithmFileNames) {
            let algorithmFilePath = `${algorithmsDir}/files/${algorithmFileName}`;
            let algorithmPageName = `${path.parse(algorithmFileName).name}.md`;
            let algorithmPagePath = `${algorithmsDir}/pages/${algorithmPageName}`;
            let algorithmFile = await fse.readFile(algorithmFilePath, 'utf8');
            let algorithmObject = JSON.parse(algorithmFile);
            if(_.contains(algorithmPageNames, algorithmPageName)) {
                algorithmObject.longDescription = await fse.readFile(algorithmPagePath, 'utf8');
            }
            algorithmObjects.push(algorithmObject);
        }
        return fse.writeJson(`${distDir}/algorithms/compiled.json`, algorithmObjects);
    });
})()
.catch((error)=> {
    //Handle errors.
    console.error(error);
});

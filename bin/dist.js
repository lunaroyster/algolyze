#!/usr/bin/env node

const Q = require('q');
const fse = require('fs-extra');

Q.fcall(function() {
    require('../frontend/index');
    let dir = './dist';
    return Q.fcall(function() {
        return fse.emptyDir(dir);
    })
    .then(()=> {
        console.log("Moving static assets to distribution");
        return fse.copy('./frontend/static', `${dir}`, {overwrite: false});
    })
    .then(()=> {
        console.log("Moving generated assets to distribution");
        return fse.copy('./frontend/generated', `${dir}`, {overwrite: false});
    })
    .then(()=> {
        console.log("Copying all algorithms to distribution");
        return fse.copy('./algorithms', `${dir}/algorithms/all`, {overwrite: false});
    })
    .then(()=> {
        //Compiles all algorithms into one.
        console.log("Generating a compiled file of algorithms");
        return fse.readdir('./algorithms')
        .then((algorithmFileList)=> {
            let algorithmObjects = [];
            algorithmFileList.forEach((algorithmFile)=> {
                algorithmObjects.push(fse.readJsonSync(`./algorithms/${algorithmFile}`));
            });
            return algorithmObjects;
        })
        .then((algorithmObjects)=> {
            return fse.writeJson(`${dir}/algorithms/compiled.json`, algorithmObjects);
        });
    });
})
.catch(function(error) {
    console.error(error);
})
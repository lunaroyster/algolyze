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
    })
    .then(async ()=> {
        //Compile algorithms and copy compiled versions
        await require('../algorithms/index');
        fse.copy(`${algorithmsDir}/generated`, `${distDir}`, {overwrite: false});
    });
})()
.catch((error)=> {
    //Handle errors.
    console.error(error);
});

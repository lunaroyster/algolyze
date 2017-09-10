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
        return fse.copy('./frontend/static', `${dir}`, {overwrite: false});
    })
    .then(()=> {
        return fse.copy('./frontend/generated', `${dir}`, {overwrite: false});
    })
    .then(()=> {
        return fse.copy('./algorithms', `${dir}/algorithms/all`, {overwrite: false});
    });
})
.catch(function(error) {
    console.error(error);
})
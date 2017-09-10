#!/usr/bin/env node

const Q = require('q');
const fse = require('fs-extra');

Q.fcall(function() {
    require('../frontend/index');
    let dir = './dist';
    fse.emptyDirSync(dir);
    fse.copySync('./frontend/static', `${dir}`);
    fse.copySync('./frontend/generated', `${dir}`);
    fse.copySync('./algorithms', `${dir}/algorithms/all`, {overwrite: true});
})
.catch(function(error) {
    console.error(error);
})
#!/usr/bin/env node

const Q = require('q');
const fse = require('fs-extra');

Q.fcall(function() {
    let dir = './dist';
    fse.ensureDirSync(dir);
    fse.copySync('./frontend/public', './dist', {overwrite: true});
})
.catch(function(error) {
    console.error(error);
})
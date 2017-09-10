#!/usr/bin/env node

const Q = require('q');
const fs = require('fs');
const _ = require('underscore');
const assert = require('assert');
const AlgorithmSchemaChecker = require('../lib/AlgorithmSchemaChecker');
const algorithmDirectory = './algorithms';


Q.fcall(function() {
    //Individual algorithm check
    console.log("Verifying algorithms")
    let algorithmFileList = fs.readdirSync(algorithmDirectory);
    let algorithmObjects = [];
    for(let algorithmFileName of algorithmFileList) {
        let filePath = `${algorithmDirectory}/${algorithmFileName}`;
        algorithmObjects.push(JSON.parse(fs.readFileSync(filePath, 'utf8')));
    }
    for(let algorithmObject of algorithmObjects) {
        AlgorithmSchemaChecker.assertCheck(algorithmObject);
        console.log(`Checked '${algorithmObject.name}'`);
    }
    console.log("Verified each algorithm");
    return algorithmObjects;
})
.then(function(algorithmObjects) {
    console.log("Checking for duplicates");
    assert(_.chain(algorithmObjects).groupBy('name').filter(function(nameList){return nameList.length > 1}).value().length == 0);
    console.log("No duplicates found");
})
.catch(function(error) {
    console.error(error);
});


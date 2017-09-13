#!/usr/bin/env node

const Q = require('q');
const fse = require('fs-extra');
const path = require('path');
const _ = require('underscore');
const assert = require('assert');
const AlgorithmSchemaChecker = require('../lib/AlgorithmSchemaChecker');

const algorithmDirectory = './algorithms';
const filesDirectory = `${algorithmDirectory}/files`;
const pagesDirectory = `${algorithmDirectory}/pages`;

(async function() {
    let algorithmFiles = {};
    let algorithmPages = {};
    let algorithmFileList = await fse.readdir(filesDirectory);
    let algorithmPageList = await fse.readdir(pagesDirectory);
    for(let algorithmFilePath of algorithmFileList) {
        let filePath = `${filesDirectory}/${algorithmFilePath}`;
        algorithmFiles[path.parse(algorithmFilePath).name] = JSON.parse(await fse.readFile(filePath, 'utf8'));
    }
    for(let algorithmPagePath of algorithmPageList) {
        let pagePath = `${pagesDirectory}/${algorithmPagePath}`;
        algorithmPages[path.parse(algorithmPagePath).name] = await fse.readFile(pagePath, 'utf8');
    }
    // console.log(algorithmFiles);
    return await (async() => {
        //Verify algorithm files
        console.log("Verifying algorithms");
        for(let algorithmFileName in algorithmFiles) {
            AlgorithmSchemaChecker.assertCheck(algorithmFiles[algorithmFileName]);
        }
        console.log("Verified each algorithm");
    })()
    .then(()=> {
        //Verify algorithm pages
        console.log("Verifying pages");
    })
    .then(()=> {
        //Check that no pages exist for algorithms without files
        console.log("Verifying that extra pages don't exist");
        let algorithmFileNames = _.keys(algorithmFiles);
        let algorithmPageNames = _.keys(algorithmPages);
        let extraFileCount = _.difference(algorithmPageNames, algorithmFileNames).length;
        assert(extraFileCount == 0, `Found ${extraFileCount} algorithm page(s) that don't have associated algorithm files`);
    })
    .then(()=> {
        //Check for duplicate algorithms
        console.log("Checking for duplicates");
        assert(_.chain(algorithmFiles).groupBy('name').filter(function(nameList){return nameList.length > 1}).value().length == 0);
        console.log("No duplicates found");
    });
})()
.catch((error)=> {
    //Handle errors.
    console.error(error);
});

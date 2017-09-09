#!/usr/bin/env node

/**
 * Module dependencies.
 */
var Mocha = require('mocha');
var Q = require('q');

var mocha = new Mocha({
    // reporter: 'html',
    // grep: ""
});

mocha.addFile('./tests');

Q.fcall(function() {
    mocha.run();
});
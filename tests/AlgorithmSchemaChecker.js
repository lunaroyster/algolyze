const assert = require('assert');
var AlgorithmSchemaChecker = require("../lib/AlgorithmSchemaChecker.js");

var generators = require("./generators");
var AlgorithmGenerator = generators.AlgorithmGenerator;

var testAlgorithm = function(algorithm) {
    var _testAlgorithm = function(algorithm, result) {
        return assert(AlgorithmSchemaChecker.check(algorithm)==result);
    };
    var response = {};
    response.success = ()=>{return _testAlgorithm(algorithm, true)};
    response.fail = ()=>{return _testAlgorithm(algorithm, false)};
    return response;
};

describe("algorithm schema checker", function() {
    describe("documents", function() {
        it("allows algorithms with just name and description");
        it("allows algorithms with select allowed fields");
        it("doesn't allow algorithms with duplicate fields");
        it("doesn't allow algorithms with fields not defined in schema");
    });
    describe("algorithm fields", function() {
        describe("name", function() {
            it("ensures correct name length");
            it("ensures algorithms have name");
        });
        describe("longName", function() {
            it("ensures longName length");
        });
        describe("tags", function() {
            it("ensures tags are provided as an array");
            it("ensures that there are no duplicates");
        });
        describe("description", function() {
            it("ensures description length");
        });
        describe("longDescription", function() {
            it("ensures longDescription length");
        });
        describe("link", function() {
            it("ensures links are provided as an array");
            it("ensures that there are no duplicates");
            it("ensures links are valid links");
        });
    });
});
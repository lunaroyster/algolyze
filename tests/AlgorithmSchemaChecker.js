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
        it("allows algorithms with just name and description", function() {
            let alg = {
                name: "name", 
                description: "description"
            };
            testAlgorithm(alg).success();
        });
        it("allows algorithms with select allowed fields", function() {
            let alg = {
                name: "name", 
                longName: "longName", 
                tags: ["tag1", "tag2"],
                description: "description", 
                longDescription: "longDescription",
                links: ["https://example.com"]
            };
            testAlgorithm(alg).success();
        });
        it("doesn't allow algorithms with duplicate fields", function() {
            let alg = {name: "name1", name: "name2", description: "description1", description: "description2"};
            testAlgorithm(alg).fail();
        });
        it("doesn't allow algorithms with fields not defined in schema", function() {
            let alg = {name: "name", description: "description", foo: "foo", bar: "bar"};
            testAlgorithm(alg).fail();
        });
    });
    describe("algorithm fields", function() {
        describe("name", function() {
            it("ensures correct name length");
            it("ensures algorithms have name", function() {
                let alg1 = {description: "description"};
                let alg2 = {name: "name", description: "description"};
                testAlgorithm(alg1).fail();
                testAlgorithm(alg2).success();
            });
        });
        describe("longName", function() {
            it("ensures longName length");
        });
        describe("tags", function() {
            it("ensures tags are provided as an array", function() {
                let alg1 = {name: "name", description: "description", tags: "tags"};
                let alg2 = {name: "name", description: "description", tags: ["tags"]};
                testAlgorithm(alg1).fail();
                testAlgorithm(alg2).success();
            });
            it("ensures that there are no duplicates", function() {
                let alg1 = {name: "name", description: "description", tags: ["tag1", "tag2", "tag1"]};
                let alg2 = {name: "name", description: "description", tags: ["tag1", "tag2", "tag3"]};
                testAlgorithm(alg1).fail();
                testAlgorithm(alg2).success();
            });
        });
        describe("description", function() {
            it("ensures description length");
        });
        describe("longDescription", function() {
            it("ensures longDescription length");
        });
        describe("links", function() {
            it("ensures links are provided as an array", function() {
                let alg1 = {name: "name", description: "description", links: "https://example.org"};
                let alg2 = {name: "name", description: "description", links: ["https://example.org"]};
                testAlgorithm(alg1).fail();
                testAlgorithm(alg2).success();
            });
            it("ensures that there are no duplicates", function() {
                let alg1 = {name: "name", description: "description", links: ["https://example.org", "https://example.org"]};
                let alg2 = {name: "name", description: "description", links: ["https://example.org", "https://example.com"]};
                testAlgorithm(alg1).fail();
                testAlgorithm(alg2).success();
            });
            it("ensures links are valid links", function() {
                let alg1 = {name: "name", description: "description", links: ["example"]};
                let alg2 = {name: "name", description: "description", links: ["https://example.org"]};
                testAlgorithm(alg1).fail();
                testAlgorithm(alg2).success();
            });
        });
    });
});
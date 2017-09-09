var assert = require("assert");

var validate = require('jsonschema').validate;
var algorithmSchema = require('../schema/algorithm.js');

class AlgorithmSchemaChecker {
    static check(algorithm) {
        return(validate(algorithm, algorithmSchema).valid);
    }
    static assertCheck(algorithm) {
        assert(validate(algorithm, algorithmSchema).valid);
    }
}

module.exports = AlgorithmSchemaChecker;
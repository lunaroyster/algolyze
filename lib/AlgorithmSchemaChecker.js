const assert = require("assert");

var validate = require('jsonschema').validate;
var algorithmSchema = require('../schema/algorithm.js');

class AlgorithmSchemaChecker {
    static check(algorithm) {
        return(validate(algorithm, algorithmSchema).valid);
    }
    static assertCheck(algorithm) {
        return assert(AlgorithmSchemaChecker.check(algorithm));
    }
    static checkAll(algorithms) {
        let finalResult = true;
        for(let algorithm of algorithms) {
            let result = AlgorithmSchemaChecker.check(algorithm);
            finalResult = finalResult && result;
            // assert(result, `Failed at algorithm '${algorithm.name||"unnamed"}'`);
        }
        return finalResult;
    }
}

module.exports = AlgorithmSchemaChecker;
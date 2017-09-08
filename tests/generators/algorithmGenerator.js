var RNG = require('./RNG');
var prototypes = require('./prototypes');

var Algorithm = class Algorithm extends prototypes.objectPrototype {
    constructor(seed) {
        super();
        this.seededRNG = new RNG(seed);
        this.randomGenerator = this.seededRNG.generator();
        var _algorithm = {};
        this._algorithm = _algorithm;
    }
    random() {
        return this.randomGenerator.next().value;
    }
};

var AlgorithmGenerator = class AlgorithmGenerator {
    constructor() {
        this._seed = RNG.random(); //Generates random seed upon init
        this._algorithms = [];
    }
    algorithm(iteration) {
        var i = 0;
        if(typeof iteration == "string") {
            i = iteration.charCodeAt();
        }
        else if(typeof iteration == "number") {
            i = iteration;
        }
        if(this._algorithms[i]) return {algorithm: this._algorithms[i]};
        this._algorithms[i] = new Algorithm(i*this._seed);
        return {event: this._algorithms[i]};
    }

    get seed() {
        return this._seed;
    }
    set seed(value) {
        this._seed = value;
    }
};

module.exports = AlgorithmGenerator;
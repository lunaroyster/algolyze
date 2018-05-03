const algorithms = require('@algolyze/algorithms').algorithms;
let algorithmArray = Object.values(algorithms);
let algorithmJSON = JSON.stringify(algorithmArray);

function pragmaticAlgorithmImporter(options) {}

pragmaticAlgorithmImporter.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {
    compilation.assets['algorithms/compiled.json'] = {
      source: function() {
        return algorithmJSON;
      },
      size: function() {
        return algorithmJSON.length;
      }
    };
    callback();
  });
};

module.exports = pragmaticAlgorithmImporter;
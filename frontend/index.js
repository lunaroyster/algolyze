const fse = require('fs-extra');

module.exports = (async function() {
    await fse.emptyDirSync('./frontend/generated');
    await require('./compileless')(`${__dirname}/less/`, `${__dirname}/generated/css/`);
})();
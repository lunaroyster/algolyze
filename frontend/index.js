const fse = require('fs-extra');

module.exports = (async function() {
    await fse.emptyDirSync('./frontend/generated');
    // await require('./compileless')(`${__dirname}/less/`, `${__dirname}/generated/css/`);
    await require('./compilescss')(`${__dirname}/scss/`, `${__dirname}/generated/css/`);
    await require('./babelcompile')(`${__dirname}/static/app.js`, `${__dirname}/generated/app41.js`);
})();
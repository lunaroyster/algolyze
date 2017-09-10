const fse = require('fs-extra');

fse.emptyDirSync('./frontend/generated');

require('./compileless');
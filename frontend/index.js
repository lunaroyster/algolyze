const fse = require('fs-extra');

fse.ensureDirSync('./frontend/generated');

require('./compileless');
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveDirectory = (relativePath = '') => path.resolve(appDirectory, relativePath);

module.exports = {
  root: resolveDirectory(),
  build: resolveDirectory('build'),
  src: resolveDirectory('src'),
  stylePath: resolveDirectory('src/scss'),
  entryIndex: resolveDirectory('src/index.js'),
};

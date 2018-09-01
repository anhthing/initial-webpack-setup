const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common');
const appPaths = require('./appPaths');

const cleanAppBuildDir = new CleanWebpackPlugin(['build'], {
  root: appPaths.root,
});


module.exports = merge(common, {
  mode: 'production',
  plugins: [
    cleanAppBuildDir,
  ],
});

const HTMLWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const appPaths = require('./appPaths');

/* Plugins */
const buildIndexHTML = new HTMLWebpackPlugin({
  template: './src/index.html',
  filename: './index.html',
});

const extractSCSS = new ExtractTextWebpackPlugin({
  filename: 'styles.css',
});

const uglifyJs = new UglifyJsPlugin({
  cache: true,
  parallel: true,
  sourceMap: false,
});

const dotEnv = new Dotenv({
  systemvars: true,
  silent: true,
});

module.exports = {
  entry: {
    app: appPaths.entryIndex,
  },
  output: {
    path: appPaths.build,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]_[hash:base64]',
                camelCase: 'dashes',
              },
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [appPaths.stylePath],
                data: '@import \'styles.scss\';',
              },
            },
          ],
        }),
      },
    ],
  },
  optimization: {
    splitChunks: {
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 1,
        },
      },
    },
    minimizer: [uglifyJs],
  },
  devServer: {
    port: 3030,
    compress: true,
  },
  plugins: [
    buildIndexHTML,
    extractSCSS,
    dotEnv,
  ],
};

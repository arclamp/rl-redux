var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    rl: './src/index.js'
  },
  output: {
    path: 'build',
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'rl-redux'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.jade$/,
        loader: 'jade-loader'
      }
    ]
  }
};

var webpack = require('webpack');

module.exports = {
  entry: {
    rl: './src/index.js'
  },
  output: {
    path: 'build',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};

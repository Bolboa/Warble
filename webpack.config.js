var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCSS = new ExtractTextPlugin('styles.css',{
  allChunks:true
});

module.exports = {
  entry: './src',

  output: {
    path:'public',
    filename: 'scripts/bundle.js',
    publicPath: '/'
  },

  module: {
    loaders:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:{
          presets: ['es2015','react']
        }
      },
      {
          test: /\.scss$/,
          loader: extractCSS.extract(['css','sass'])
      }
    ]
  },
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    extractCSS
  ] : [
    extractCSS
  ]
}

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCSS = new ExtractTextPlugin('styles.css',{
  allChunks:true
});

module.exports = {
  entry: ['webpack-hot-middleware/client','./src'],

  devtool: 'source-map',
  output: {
    path:'/',
    filename: 'scripts/bundle.js',
    publicPath: '/'
  },

  module: {
    loaders:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [  'babel?presets[]=es2015,presets[]=react']
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
    extractCSS,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()

  ]
}

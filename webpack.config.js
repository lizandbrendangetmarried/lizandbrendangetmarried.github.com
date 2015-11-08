var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var templateContent = '<html>' +
  '<head>' +
    '<title>lizandbrendangetmarried.com</title>' +
    '<link rel="shortcut icon" href="favicon.ico" />' +
    '<link href="https://fonts.googleapis.com/css?family=Vidaloka" rel="stylesheet" type="text/css">' +
  '</head>' +
  '<body>' +
    '<div id=\'root\'></div>' +
  '</body>' +
'</html>';

var entry = ['./src/index'];
var cssLoader = 'style-loader!css-loader';
if (process.env.NODE_ENV) {
  cssLoader = ExtractTextPlugin.extract('style-loader', 'css-loader');
}

module.exports = {
  devtool: 'eval',
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist/static'),
    filename: 'bundle.js',
    publicPath: 'static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("[name].css"),
    new HtmlWebpackPlugin({
      title: 'lizandbrendangetmarried.com',
      filename: '../index.html',
      templateContent: templateContent,
      inject: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js|\.jsx$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      { test: /\.css$/, loader: cssLoader }
    ]
  }
};

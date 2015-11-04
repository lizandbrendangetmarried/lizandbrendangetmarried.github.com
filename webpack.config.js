var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var templateContent = '<html>' +
  '<head>' +
    '<title>lizandbrendangetmarried.com</title>' +
  '</head>' +
  '<body>' +
    '<div id=\'root\'></div>' +
  '</body>' +
'</html>';

var entry = ['./src/index'];
if (process.env.NODE_ENV != 'prod') {
  entry.push('webpack-dev-server/client?http://localhost:3000');
  entry.push('webpack/hot/only-dev-server');
}


module.exports = {
  devtool: 'eval',
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist/static'),
    filename: 'bundle.js',
    publicPath: '/static/'
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
        test: /\.js$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') }
    ]
  }
};

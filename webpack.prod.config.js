var path = require('path');
var webpack = require('webpack');
var nodeModulesDir = path.resolve(__dirname, 'node_modules');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    main: './client/jsx/main.jsx',
    vendor: [
      'lodash',
      'fetch-polyfill',
      'element-closest',
      'babel-polyfill',
      'react',
      'react-dom',
      'redux',
      'redux-saga',
      'react-redux',
      'react-router-dom',
      'prop-types',
      'react-bootstrap',
      'reselect',
      'seamless-immutable'
    ],
  },
  output: {
    publicPath: 'http://localhost:8080/',
    filename: './server/build/public/js/[name].js',
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot-loader', 'babel-loader']
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
                loader: "css-loader"
            }, {
                loader: "less-loader"
            }],})
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=public/build/fonts/[name].[ext]'
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin('./server/build/public/css/main.css'),
    new webpack.optimize.CommonsChunkPlugin({ name:'vendor', filename:'./server/build/public/js/vendor.js'}),
  ],
};
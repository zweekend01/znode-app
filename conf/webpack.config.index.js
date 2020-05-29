const path = require('path');
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  baseConfig.mode = 'development';
  baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  baseConfig.devtool = '#cheap-module-eval-source-map';
  baseConfig.devServer = {
    host: '0.0.0.0',
    port: '8888',
    contentBase: path.join(__dirname, '../public'),
    publicPath: '/public',
    historyApiFallback: { index: '/public/index.html' },
    overlay: { errors: true },
    hot: true,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
} else {

}

module.exports = baseConfig;

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base');

module.exports = merge(baseConfig, {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new NamedModulesPlugin() => mode 为 development 时，默认内置了该功能
  ],
  devtool: 'source-map',
  devServer: {
    host: 'localhost',
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
});

const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const baseConfig = require('./webpack.config.base');

/**
 *  1. 体积优化：代码分割（lazy loading、split chunks）
 *  2. 速度优化：基础包 CDN
 *  3. Tree Shaking: production 模式默认开启
 *  4. Scope Hoisting: production 模式默认开启
 *  5. 代码压缩：通过插件对 js、css、html 等文件进行压缩（production 模式下默认压缩 js 文件）
 *  6. 文件指纹: 通过 hash、chunkhash、contenthash 对 js、css、img 和 font 等文件设置指纹
 */

module.exports = merge({
  customizeArray(base, pro, key) {
    if (key === 'plugins') {
      base = base.filter(p => !(
        p instanceof MiniCssExtractPlugin || p instanceof HtmlWebpackPlugin
      ));
      return [...base, ...pro];
    }
    return undefined;
  }
})(baseConfig, {
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        commons: {
          name: 'commons',
          minSize: 0,
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    new OptimizeCSSAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../client/index.html'),
      filename: 'index.html',
      chunks: ['index', 'vendors', 'commons'],
      inject: true,
      minify: {
        html5: true,
        collapseWhiteSpace: true,
        preserveLineBreaks: false,
        removeAttributeQuotes: true,
        removeComments: false,
        minifyCSS: true,
        minifyJS: true
      }
    }),
    new CleanWebpackPlugin()
  ],
  output: {
    filename: '[name].[chunkhash:8].js'
  }
});


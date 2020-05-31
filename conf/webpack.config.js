const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');

const isDev = process.env.NODE_ENV === 'development';

module.exports = [isDev ? devConfig : prodConfig];

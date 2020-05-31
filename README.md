# znode-app

基于 NodeJS 实现的博客网站

## 1. 项目的功能

此项目是对 CNode 社区的模拟，能实现浏览文章、登录、评论、发布文章等基本功能，后端的 api 均自行设计

## 2. Client Side Render

### 2.1 Client Side

#### 2.1.1 技术选型

- npm
- typescript, react, antd, react-router4, mobx, mobx-react
- webpack

#### 2.1.2 工程架构

1. 依赖管理

> (1) 业务开发依赖

```cmd
$ npm i -S
  react \
  react-css-modules \
  antd \
  ts-import-plugin \
  react-router-dom \
  redux \
  react-redux \
  axios \
  await-to-js \
  react-dom \
```

```cmd
$ npm i -D
  @types/react \
  @types/react-css-modules \
  @types/react-router-dom \
  @types/react-dom \
  @types/react-hot-loader
```

> (2) 项目构建依赖

```cmd
$ npm i -D typescript tslint tslint-react
```

```cmd
$ npm i -D husky
```

```cmd
$ npm i -D \
  webpack \
  webpack-cli \
  webpack-dev-server \
  webpack-merge \
  elsint \
  typescript \
  @typescript-eslint/parser \
  @typescript-eslint/eslint-plugin \
  eslint-plugin-import \
  eslint-plugin-node \
  eslint-plugin-promise \
  eslint-plugin-standard \
  eslint-config-standard \
  eslint-plugin-jsx-a11y \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-config-airbnb-typescript \
  eslint-loader \
  @babel/core \
  @babel/preset-typescript \
  babel-loader \
  fork-ts-checker-webpack-plugin \
  raw-loader \
  url-loader \
  less-loader \
  less \
  css-loader \
  typings-for-css-modules-loader \
  px2rem-loader \
  postcss-loader \
  postcss-import \
  postcss-preset-env \
  cssnano \
  autoprefixer \
  postcss-flexbugs-fixes \
  style-loader \
  mini-css-extract-plugin \
  optimize-css-assets-webpack-plugin \
  html-webpack-plugin \
  clean-webpack-plugin \
  cross-env \

  $ npm i -S react-hot-loader
```

2. 搭建项目构建工作流

> (1) editorconfig

editorconfig 可以对空白行、缩进等编码格式进行格式化，这种格式化与编程语言无关，有助于团队协作，配置步骤如下：

- IDE 安装 editorconfig 插件（默认下载 editorconfig npm package），该插件会在工作目录调用 editorconfig npm package
- 在工程目录下，添加 .editorconfig 文件，对全局的 editorconfig 进行相关配置

```conf
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline= true
trim_trailing_whitespace = true
```

> (2) eslint

eslint 是 ecmascript/typescript 编程格式的校验工具，有助于团队的编程格式统一，配置步骤如下：

- IDE 安装 eslint 插件，该插件会在工作目录调用 eslint 相关的 npm package
- 在工程目录下，添加 .eslintrc 文件

```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommend",
    "standard",
    "airbnb-typescript"
  ]
}
```

> (3) git

避免团队成员上传不符合规范的代码，配置步骤如下：

- package.json 文件中，添加 npm script 和 husky.hooks 如下，在代码提交时用 eslint 检测代码规范：

```json
{
  "scripts": {
    "lint": "eslint --ext .ts --ext .tsx client/"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint"
    }
  }
}
```

- 在工程目录下添加 .gitignore 文件

> (4) webpack

开发环境和生产环境有部分配置重叠，配置步骤如下:

- 配置 webpack.config.base.js、webpack.config.prod.js、.babelrc、tsconfig.json、postcss.config.js 文件

```javascript
// conf/webpack.config.base.js => 开发环境和生产环境共用的配置
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * 1. JavaScript packing config
 *  1.1 mode
 *  1.2 resolve
 *  1.3 entry
 *  1.4 module, plugins
 *    - 校验 typescript
 *    - 编译 typescript（包括 JSX）
 *    - 编译普通文本文件
 *    - 编译和打包图片字体文件
 *    - 编译和打包 less、css 等样式文件
 *    - 编译和打包（多）html 文件
 *
 * 2. JavaScript compiler config
 *  2.1 output
 */

module.exports = {
  mode: 'production',
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      '@': path.join(__dirname, '../src')
    }
  },
  entry: {
    index:  ['react-hot-loader/patch', path.join(__dirname, '../src/index.tsx')]
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts|tsx)$/,
        use: 'tslint-loader',
        exclude: [path.join(__dirname, '../node_modules')]
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
        exclude: [path.join(__dirname, '../node_modules')]
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          { loader: 'url-loader', options: { limit: 8192, name: '[name].[hash:8].[ext]' } }
        ]
      },
      {
        test: /\.less$/,
        use: [
          // {
            // loader: 'style-loader',
            // options: {
              // insertAt: 'top',
              // singleton: true
            // }
          // },
          MiniCssExtractPlugin.loader,
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true,
              camelCase: true,
              minimize: true,
              localIdentName: '[local]_[hash:base64:5]'
            }
          },
          {
            loader: 'px2rem-loader',
            options: { remUni: 75, remPrecision: 8 }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss'
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ],
        exclude: [path.join(__dirname, '../node_modules')]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      name: '[name].[contenthash:8].css'
    }),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      filename: 'index.html',
      chunks: ['index'],
      inject: true
    })
  ],
  output: {
    path: path.join(__dirname, '../public'),
    publicPath: '/public/',
    filename: '[name].js'
  }
};
```

```javascript
// conf/webpack.config.dev.js
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
  // watch: true,
  // watchOptions: {
  //   poll: 1000,
  //   aggregateTimeout: 300,
  //   ignored: /node_modules/
  // },
  devServer: {
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
});
```

```javascript
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
```

```javascript
// conf/webpack.config.js
const devConfig = require('./webpack.config.dev');
const prodConfig = require('./webpack.config.prod');

const isDev = process.env.NODE_ENV === 'development';

module.exports = [isDev ? devConfig : prodConfig];
```

```javascript
// .postcss.config.js
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {},
    cssnano: {},
    autoprefixer: {
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9' // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009'
    },
    'postcss-flexbugs-fixes': {}
  }
};
```

```json
// .babelrc
{
  "presets": [["@babel/preset-typescript", { "loose": true }]],
  "plugins": [
    "react-hot-loader/babel"
  ]
}
```

```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "lib": ["dom", "esnext"],
    "jsx": "react",
    "sourceMap": true,
    "strict": true
  },
  "include": ["./src/**/*"]
}
```

- 在 package.json 文件中添加 npm scripts

```json
{
  // "dev": "cross-env NODE_ENV=development webpack --watch --config build/webpack.config.js",
  "dev": "cross-env NODE_ENV=development webpack-dev-server --open --config build/webpack.config.js",
  "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
}
```

#### 2.1.3 项目架构

```cmd
- client
  - api           => 接口请求
  - asset         => 静态资源
  - component     => 项目通用组件，包括布局组件、高阶组件、业务组件等
    - layout
    - hoc
  - conf          => 项目配置
  - page          => 页面组件
  - router        => 路由组件
  - store         => 状态管理
  - style         => 项目通用的样式，以及全局的样式兼容性设置
  - type          => 类型定义
  - util          => 项目通用的工具库
  - global.d.ts
  - index.html
  - index.tsx
  - tslint.json
```

#### 2.1.4 业务开发

> (1) 配置全局的样式

解决 html 元素在各浏览器中兼容性的问题、实现基于 rem 的弹性布局

> (2) 解决 antd 组件库按需加载以及样式打包的问题

配置 webpack.config.base.js 如下：

```javascript
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
  modules: {
    rules: [
      // 解决按需加载
      {
        test: /\.(tsx|ts)$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [ tsImportPluginFactory( /** options */) ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        },
        exclude: /node_modules/
      },
      // 解决样式冲突
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss'
            }
          }
        ],
        include: /node_modules/
      }
    ]
  }
};
```

> (3) 基于 axios 封装 http 请求

请求 loading 的开启与关闭、请求成功的统一提示、请求失败的统一提示

#### 2.1.5 性能优化

#### 2.1.6 安全防御

#### 2.1.7 单元测试

#### 2.1.8 项目构建

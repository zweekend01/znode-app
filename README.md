# znode-app

基于 NodeJS 实现的博客网站

## 1. 项目的功能

此项目是对 CNode 社区的模拟，能实现浏览文章、登录、评论、发布文章等基本功能，后端的 api 均自行设计

## 2. 项目的技术选型

> (1) 前端技术选型

- es6+
- react, react-router4, mobx, mobx-react、ant-design
- axios
- webpack

> (2) 后端技术选型

- es6+
- express

> (3) 数据库选型

- mysql

## 3. 工程架构

### 3.1 client工程架构

#### 3.1.1 editorconfig

editorconfig 可以对空白行、缩进等编码格式进行格式化，这种格式化与编程语言无关，有助于团队协作，配置步骤如下：

- VSCode 安装 'EditorConfig for VS Code' 插件（默认下载 editorconfig npm package），该插件会在工作目录调用 editorconfig npm package
- 在工程目录下，添加 .editorconfig 文件，对 editorconfig 进行相关配置

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

#### 3.1.2 eslint

eslint 是 javascript 编程格式的校验工具，有助于团队的编程格式统一，配置步骤如下：

- VSCode 安装 'ESLint' 插件，该插件会在工作目录调用 eslint 相关的 npm package
- 安装相关的 npm package：

```cmd
  $ npm i -D \
    eslint \
    babel-eslint \
    eslint-config-standard \
    eslint-config-airbnb \
    eslint-plugin-import \
    eslint-plugin-jsx-a11y \
    eslint-plugin-node \
    eslint-plugin-promise \
    eslint-plugin-react \
    eslint-plugin-standard
```

- 在工程目录下，添加 .eslintrc 文件，对 eslint 进行相关配置

```json
  {
    "parser": "babel-eslint",
    "env": {
      "browser": true,
      "es6": true,
      "node": true
    },
    "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module"
    },
    "extends": ["standard", "airbnb"],
    "rules": {}
  }
```

#### 3.1.3 git

避免团队成员上传不符合规范的代码，配置步骤如下：

- 安装相关 npm package

```cmd
  $ npm i -D husky
```

- 在 package.json 文件中，添加 npm script 和 husky.hooks 如下，在代码提交时用 eslint 检测代码规范：

```json
  {
    "scripts": {
      "lint": "eslint --ext .js --ext .jsx client/"
    },
    "husky": {
      "hooks": {
        "pre-commit": "npm run lint"
      }
    }
  }
```

- 在工程目录下添加 .gitignore 文件

#### 3.1.4 webpack

> (1) 前端渲染的开发/生产环境配置

开发环境和生产环境有部分配置重叠，配置步骤如下:

- 安装相关 npm package：

```cmd
  $ npm i -D
    eslint-loader \
    babel-loader \
    @babel/core \
    @babel/preset-env \
    @babel/preset-react \
    raw-loader \
    url-loader \
    style-loader \
    css-loader \
    postcss-loader \
    postcss-import \
    postcss-preset-env \
    cssnano \
    autoprefixer \
    postcss-flexbugs-fixes \
    less-loader \
    less \
    html-webpack-plugin \
    webpack-dev-server \
    webpack \
    webpack-cli \
    cross-env \
    rimraf

  $ npm i -S react-hot-loader
```

- 配置 .babelrc、postcss.config.js、webpack.config.client.js、webpack.config.index.js文件

```json
  // .babelrc
  {
    "presets": [
      ["@babel/preset-env", { "loose": true }],
      "@babel/preset-react"
    ],
    "plugins": ["react-hot-loader/babel"]
  }
```

```js
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
          'not ie < 9', // React doesn't support IE8 anyway
        ],
        flexbox: 'no-2009',
      },
      'postcss-flexbugs-fixes': {}
    }
  }
```

```javascript
  // webpack.config.client.js => 开发环境和生产环境共用的配置
  const path = require('path')
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  module.exports = {
    mode: 'production',
    resolve: { extensions: ['.js', '.jsx'] },
    entry: {
      index: path.join(__dirname, '../client/index.js')
    },
    output: {
      path: path.join(__dirname, '../public'),
      publicPath: '/public/',
      filename: '[name].[hash].js'
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|jsx)$/,
          use: 'eslint-loader',
          exclude: [path.join(__dirname, '../node_modules')]
        },
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: [path.join(__dirname, '../node_modules')]
        },
        {
          test: /\.txt$/,
          use: 'raw-loader',
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
          use: [
            { loader: 'url-loader', options: { limie: 8192 } }
          ]
        },
        {
          test: /\.less$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                camelCase: true
              }
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
      new HtmlWebpackPlugin({
        minify: { removeAttributeQuotes: true },
        template: path.join(__dirname, '../client/index.html'),
        filename: 'index.html'
      })
    ]
  }
```

```javascript
  // webpack.config.index.js => 开发环境和生产环境不同的配置
  const path = require('path')
  const webpack = require('webpack')
  const clientConfig = require('./webpack.config.client')

  const isDev = process.env.NODE_ENV === 'development'

  if (isDev) {
    clientConfig.mode = 'development'
    clientConfig.plugin.push(new webpack.HotModuleReplacementPlugin())
    configConfig.devtool = '#cheap-module-eval-source-map'
    clientConfig.devServer = {
      host: '0.0.0.0',
      port: '8888',
      contentBase: path.join(__dirname, '../public'),
      publicPath: '/public',
      historyApiFallback: { index: '/public/index.html' },
      overlay: { errors: true },
      hot: true
    }
  } else {

  }

  module.exports = clientConfig
```

- 在 package.json 文件中添加 npm scripts

```json
  {
    "dev:build": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.index.js",
    "clear": "rimraf public",
    "pro:build": "npm run clear && cross-env NODE_ENV=production webpack --config build/webpack.config.index.js"
  }
```

> (3) 同构渲染的开发/生产环境配置

### 3.2 server工程架构

#### 3.2.1 editorconfig

#### 3.2.2 eslint

#### 3.2.3 git

#### 3.2.4 nodemon

- 安装相关 npm package:

```cmd
  $ npm i nodemon -D
```

- 配置 nodemon.json文件

```json
  {
    "restartable": "rs",
    "ignore": [
      ".git",
      "node_modules/**/node_modules",
      ".eslintrc",
      "build",
      "client",
      "public"
    ],
    "env": {
      "NODE_ENV": "development"
    },
    "verbose": true,
    "ext": "js"
  }
```

- 在 package.json 文件中添加 npm scripts

```json
  {
    "scripts": {
      "dev:start": "cross-env NODE_ENV=development node server/bin/www.js",
      "dev:monstart": "nodemon server/bin/www.js",
      "pro:start": "cross-env NODE_ENV=production node server/bin/www.js",
      "pro:monstart": "nodemon server/bin/www.js"
    }
  }
```

## 4. 项目架构

### 4.1 client项目架构

> (1) 前端渲染的项目架构

```cmd
  - client
    - assets        => 静态资源
    - components    => 项目的通用组件，包括布局组件和高阶组件等
      - hoc
      - layout
    - config        => 项目的一些配置
    - pages         => 页面组件
    - routes        => 路由组件
    - stores        => 状态管理
    - styles        => 项目通用的样式，以及全局的样式兼容性设置
    - utils         => 工具库
    - App.jsx
    - App.less
    - index.html
    - index.js
```

> (2) 同构渲染的项目架构

### 4.2 server项目架构

> (1) 前端渲染的项目架构

```cmd
  - server
    - api
    - apidoc
    - bin
      - www.js
    - config
    - controllers
    - middlewares
    - models
    - public
    - routers
    - sql
    - utils
    - views
    - app.js
```

> (2) 同构渲染的项目架构

## 5. 业务开发

### 5.1 client业务开发

> (1) 前端渲染的业务开发

- 配置全局的样式

解决html元素在各浏览器中兼容性的问题、实现基于rem的弹性布局、解决antd接入的一些第三方样式的冲突

- 基于axios封装http请求

请求loading的开启与关闭、请求成功的统一提示、请求失败的统一提示

> (2) 同构渲染的业务开发

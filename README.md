# znode-app

基于 NodeJS 实现的博客网站

## 1. 项目的功能

此项目是对 CNode 社区的模拟，能实现浏览文章、登录、评论、发布文章等基本功能，后端的 api 均自行设计

## 2. 项目的技术选型

> (1) 前端技术选型

- typescript
- react, react-router4, mobx, mobx-react、ant-design
- axios
- webpack

> (2) 后端技术选型

- typescript
- express

> (3) 数据库选型

- mysql

## 3. Client Side Render

### 3.1 Client Side

#### 3.1.1 工程架构

> (1) editorconfig

editorconfig 可以对空白行、缩进等编码格式进行格式化，这种格式化与编程语言无关，有助于团队协作，配置步骤如下：

- VSCode 安装 'EditorConfig for VS Code' 插件（默认下载 editorconfig npm package），该插件会在工作目录调用 editorconfig npm package
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

eslint 是 ecmascript 编程格式的校验工具，有助于团队的编程格式统一，配置步骤如下：

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

- 在工程目录下，添加 .eslintrc 文件，对全局的 eslint 进行相关配置，在 client/ 目录下添加 .eslintrc 文件，对 client/ 目录的 eslint 进行相关配置

```json
// ./.eslintrc
// {
//   "extends": ["standard"],
//   "rules": {}
// }
```

```json
// ./client/.eslintrc
// {
//   "parser": "babel-eslint",
//   "parserOptions": {
//     "ecmaVersion": 2018,
//     "sourceType": "module",
//     "jsx": true
//   },
//   "env": {
//     "browser": true,
//     "es6": true,
//     "node": true
//   },
//   "extends": ["../.eslintrc", "airbnb"],
//   "rules": {}
// }
```

> (3) tslint

tslint 是 typescript 编程格式的校验工具，有助于团队的编程格式统一，配置步骤如下：

- VSCode 安装 'ESLint' 插件，该插件会在工作目录调用 eslint 相关的 npm package
- 安装相关的 npm package：

```cmd
  $ npm i -D tslint tslint-react typescript
```

- 在工程目录下，添加 tslint.json 文件，对全局的 tslint 进行相关配置，在 client/ 目录下添加 tslint.json 文件，对 client/ 目录的 tslint 进行相关配置

```json
// ./tslint.json
{
  "rulesDirectory": [
    "codelyzer"
  ],
  "rules": {
    "arrow-return-shorthand": true,
    "callable-types": true,
    "class-name": true,
    "comment-format": [
      true,
      "check-space"
    ],
    "curly": true,
    "deprecation": {
      "severity": "warn"
    },
    "eofline": true,
    "forin": true,
    "import-blacklist": [
      true,
      "rxjs/Rx"
    ],
    "import-spacing": true,
    "indent": [
      true,
      "spaces"
    ],
    "interface-over-type-literal": true,
    "label-position": true,
    "max-line-length": [
      true,
      140
    ],
    "member-access": false,
    "member-ordering": [
      true,
      {
        "order": [
          "static-field",
          "instance-field",
          "static-method",
          "instance-method"
        ]
      }
    ],
    "no-arg": true,
    "no-bitwise": true,
    "no-console": [
      true,
      "debug",
      "info",
      "time",
      "timeEnd",
      "trace"
    ],
    "no-construct": true,
    "no-debugger": true,
    "no-duplicate-super": true,
    "no-empty": false,
    "no-empty-interface": true,
    "no-eval": true,
    "no-inferrable-types": [
      true,
      "ignore-params"
    ],
    "no-misused-new": true,
    "no-non-null-assertion": true,
    "no-redundant-jsdoc": true,
    "no-shadowed-variable": true,
    "no-string-literal": false,
    "no-string-throw": true,
    "no-switch-case-fall-through": true,
    "no-trailing-whitespace": true,
    "no-unnecessary-initializer": true,
    "no-unused-expression": true,
    "no-use-before-declare": true,
    "no-var-keyword": true,
    "object-literal-sort-keys": false,
    "one-line": [
      true,
      "check-open-brace",
      "check-catch",
      "check-else",
      "check-whitespace"
    ],
    "prefer-const": true,
    "quotemark": [
      true,
      "single"
    ],
    "radix": true,
    "semicolon": [
      true,
      "always"
    ],
    "triple-equals": [
      true,
      "allow-null-check"
    ],
    "typedef-whitespace": [
      true,
      {
        "call-signature": "nospace",
        "index-signature": "nospace",
        "parameter": "nospace",
        "property-declaration": "nospace",
        "variable-declaration": "nospace"
      }
    ],
    "unified-signatures": true,
    "variable-name": false,
    "whitespace": [
      true,
      "check-branch",
      "check-decl",
      "check-operator",
      "check-separator",
      "check-type"
    ],
    "no-output-on-prefix": true,
    "use-input-property-decorator": true,
    "use-output-property-decorator": true,
    "use-host-property-decorator": true,
    "no-input-rename": true,
    "no-output-rename": true,
    "use-life-cycle-interface": true,
    "use-pipe-transform-interface": true,
    "component-class-suffix": true,
    "directive-class-suffix": true
  }
}
```

```json
// ./client/tslint.json
{
  "extends": "../tslint.json",
  "rules": { }
}
```

> (4) git

避免团队成员上传不符合规范的代码，配置步骤如下：

- 安装相关 npm package

```cmd
  $ npm i -D husky
```

- 在 package.json 文件中，添加 npm script 和 husky.hooks 如下，在代码提交时用 eslint 检测代码规范：

```json
{
  "scripts": {
    // "lint": "eslint --ext .js -- ext .jsx client/"
    "lint": "tslint --ext .ts --ext .tsx client/"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint"
    }
  }
}
```

- 在工程目录下添加 .gitignore 文件

> (5) webpack

开发环境和生产环境有部分配置重叠，配置步骤如下:

- 安装相关 npm package：

```cmd
  $ npm i -D
    <!-- 适用于 ecmascript -->
    eslint-loader \
    babel-loader \
    @babel/core \
    @babel/preset-env \
    @babel/preset-react \

    <!-- 适用于 typescript -->
    tslint-loader
    ts-loader
    typescript

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

- 配置 .babelrc、tsconfig.json、postcss.config.js、webpack.config.client.js、webpack.config.index.js 文件

```json
// .babelrc
// {
//   "presets": [["@babel/preset-env", { "loose": true }], "@babel/preset-react"],
//   "plugins": ["react-hot-loader/babel"]
// }
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES5",
    "module": "ES2015",
    "lib": ["DOM", "ESNEXT"],
    "jsx": "react",
    "sourceMap": true,
    "strict": true
  },
  "include": ["./client/**/*"]
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
        'not ie < 9' // React doesn't support IE8 anyway
      ],
      flexbox: 'no-2009'
    },
    'postcss-flexbugs-fixes': {}
  }
};
```

```javascript
// webpack.config.client.js => 开发环境和生产环境共用的配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  resolve: {
    // extensions: [".js", ".jsx"],
    extensions: ['.ts', '.tsx'],
    alias: {
      '@': path.join(__dirname, '../client')
    }
  },
  entry: {
    // index: path.join(__dirname, "../client/index.js")
    index: path.join(__dirname, '../client/index.ts')
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
        // test: /\.(js|jsx)$/,
        // use: 'eslint-loader',
        test: /\.(ts|tsx)$/,
        use: 'tslint-loader',
        exclude: [path.join(__dirname, '../node_modules')]
      },
      {
        // test: /\.(js|jsx)$/,
        // use: "babel-loader",
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: [path.join(__dirname, '../node_modules')]
      },
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [{ loader: 'url-loader', options: { limie: 8192 } }]
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
};
```

```javascript
// webpack.config.index.js => 开发环境和生产环境不同的配置
const path = require('path');
const webpack = require('webpack');
const clientConfig = require('./webpack.config.client');

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  clientConfig.mode = 'development';
  clientConfig.plugin.push(new webpack.HotModuleReplacementPlugin());
  configConfig.devtool = '#cheap-module-eval-source-map';
  clientConfig.devServer = {
    host: '0.0.0.0',
    port: '8888',
    contentBase: path.join(__dirname, '../public'),
    publicPath: '/public',
    historyApiFallback: { index: '/public/index.html' },
    overlay: { errors: true },
    hot: true
  };
} else {
}

module.exports = clientConfig;
```

- 在 package.json 文件中添加 npm scripts

```json
{
  "dev:build": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.index.js",
  "clear": "rimraf public",
  "pro:build": "npm run clear && cross-env NODE_ENV=production webpack --config build/webpack.config.index.js"
}
```

#### 3.1.2 项目架构

#### 3.1.3 业务开发

### 3.2 Server Side

#### 3.2.1 工程架构

#### 3.2.2 项目架构

#### 3.2.3 业务开发

## 4. Server Side Render

## 3. 工程架构

### 3.1 client 工程架构

### 3.2 server 工程架构

#### 3.2.1 editorconfig

#### 3.2.2 eslint

#### 3.2.3 git

#### 3.2.4 nodemon

- 安装相关 npm package:

```cmd
  $ npm i nodemon -D
```

- 配置 nodemon.json 文件

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

### 4.1 client 项目架构

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

### 4.2 server 项目架构

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

### 5.1 client 业务开发

> (1) 前端渲染的业务开发

- 配置全局的样式

解决 html 元素在各浏览器中兼容性的问题、实现基于 rem 的弹性布局、解决 antd 接入的一些第三方样式的冲突

- 基于 axios 封装 http 请求

请求 loading 的开启与关闭、请求成功的统一提示、请求失败的统一提示

> (2) 同构渲染的业务开发

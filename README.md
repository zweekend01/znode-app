# znode-app

基于 NodeJS 实现的博客网站

## 1.项目的功能

此项目是对 CNode 社区的代理，能实现浏览文章、登录、评论、发布文章等基本功能，后端的 api 均采用 CNode 社区提供的接口

## 2.项目的技术选型

- 前端技术选型为 React, Mobx, Mobx-React, React-Router4 以及 material-ui组件库，采用 ES6 Module 规范进行模块化开发，打包工具和自动化构建工具选用Webpack
- 后端技术选型为 Express，代理 CNode 社区提供的 api，并实现 React 的服务端渲染
- Ajax 请求选用 axios 库

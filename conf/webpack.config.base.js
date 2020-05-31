const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const tsImportPluginFactory = require('ts-import-plugin');
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
    extensions: ['.ts', '.tsx'],
    alias: {
      // 'react-dom': '@hot-loader/react-dom',
      '@': path.join(__dirname, '../src')
    }
  },
  // entry: {
  //   index: ['react-hot-loader/patch', path.join(__dirname, '../src/index.tsx')]
  // },
  entry: ['react-hot-loader/patch', path.join(__dirname, '../src/index.tsx')],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(ts|tsx)$/,
        use: 'eslint-loader',
        exclude: [path.join(__dirname, '../node_modules')]
      },
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: "babel-loader",
          // options: {
          //   getCustomTransformers: () => ({
          //     before: [tsImportPluginFactory( /** options */)]
          //   })
          // }
        },
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
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ],
        exclude: [path.join(__dirname, '../node_modules')]
      },
      // 针对 antd 的样式
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     {
      //       loader: 'typings-for-css-modules-loader',
      //       options: {
      //         importLoaders: 1
      //       }
      //     },
      //     {
      //       loader: 'postcss-loader',
      //       options: {
      //         ident: 'postcss'
      //       }
      //     }
      //   ],
      //   include: /node_modules/
      // }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
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

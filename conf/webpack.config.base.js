const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const tsImportPluginFactory = require('ts-import-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.tsx'],
    alias: {
      '@': path.join(__dirname, '../src')
    }
  },
  entry: ['react-hot-loader/patch', path.join(__dirname, '../src/index.tsx')],
  output: {
    path: path.join(__dirname, '../public'),
    publicPath: '/public/',
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          { loader: 'url-loader', options: { limit: 8192 } }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            // loader: 'typings-for-css-modules-loader',
            // options: {
            //   modules: true,
            //   namedExport: true,
            //   camelCase: true,
            //   minimize: true,
            //   localIdentName: '[local]_[hash:base64:5]'
            // }
            loader: 'css-loader',
            options: {
              modules: true,

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
      // },
      // {
      //   enforce: 'pre',
      //   test: /\.(ts|tsx)$/,
      //   use: 'tslint-loader',
      //   exclude: [path.join(__dirname, '../node_modules')]
      // },
      // {
      //   test: /\.(ts|tsx)$/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       getCustomTransformers: () => ({
      //         before: [tsImportPluginFactory( /** options */)]
      //       })
      //     }
      //   },
      //   exclude: [path.join(__dirname, '../node_modules')]
      // }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      minify: { removeAttributeQuotes: true },
      template: path.join(__dirname, '../src/index.html'),
      filename: 'index.html'
    })
  ]
};

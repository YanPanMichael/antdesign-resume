const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    app: path.join(__dirname, './src/main.js'), //app打包入口
    venders: ['prop-types'] //要抽离的第三方插件放在这个数组里，名字可以随便起，下文CommonsChunkPlugin中的name对应
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'js/bundle.js'
  },
  devtool: 'eval-source-map',
  plugins: [ // 插件
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html',
      minify: {
        collapseWhitespace: true, //移除空格
        removeComments: true, //移除注释
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new cleanWebpackPlugin('dist'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'venders', //指定要抽离的入口，和上文对应
      filename: 'js/dependences.js' //第三方依赖集体打包后的js名
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { // 配置压缩选项
        warnings: false // 移除警告
      }
    }),
    new webpack.DefinePlugin({ //设置为产品上线环境，进一步压缩代码
      'process.env.NODE_ENV': '"production"'
    }),
    // new webpack.optimize.DedupePlugin({ //设置为产品上线环境，进一步压缩代码
    //   'process.env.NODE_ENV': '"production"'
    // })
    new extractTextWebpackPlugin('css/style.css'),
    new optimizeCssAssetsWebpackPlugin(),
  ],
  module: {
    rules: [
      { test: /\.css$/,
        use: extractTextWebpackPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
          publicPath: '../' //抽取时，自动加上路径../
        })
      }, // 如果想要启用 CSS 模块化，可以为 css-loader 添加 modules 参数即可
      { test: /\.scss$/,
        use: extractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&localIdentName=[name]_[local]-[hash:5]', 'sass-loader'],
          publicPath: '../' //抽取时，自动加上路径../
        })
      },
      { test: /\.(png|gif|bmp|jpg)$/, use: 'url-loader?limit=5000&name=imgs/[hash:8]-[name].[ext]' },
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  }  
}
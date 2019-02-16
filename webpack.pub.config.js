const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: path.join(__dirname, './src/main.js'), //app打包入口
    venders: ['prop-types'] //要抽离的第三方插件放在这个数组里，名字可以随便起，下文CommonsChunkPlugin中的name对应
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  plugins: [ // 插件
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html'
    }),
    new cleanWebpackPlugin('dist'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'venders', //指定要抽离的入口，和上文对应
      filename: 'dependences.js' //第三方依赖集体打包后的js名
    })
  ],
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 如果想要启用 CSS 模块化，可以为 css-loader 添加 modules 参数即可
      { test: /\.scss$/, use: ['style-loader', 'css-loader?modules&localIdentName=[name]_[local]-[hash:5]', 'sass-loader'] },
      { test: /\.(png|gif|bmp|jpg)$/, use: 'url-loader?limit=5000&name=imgs/[hash:8]-[name].[ext]' },
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  }  
}
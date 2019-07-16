const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['webpack-hot-middleware/client', './index.js'],
  output: {
    filename: '[name].[hash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['@babel/plugin-proposal-class-properties', { loose: true }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      inject: 'body'
    })
  ]
}

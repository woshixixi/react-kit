const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')

const devConfig = require('./webpack.dev')

const PORT = 8888

const app = express()
const compiler = webpack(devConfig)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: devConfig.output.publicPath
  })
)

app.use(
  webpackHotMiddleware(compiler, {
    publicPath: devConfig.output.publicPath
  })
)

app.listen(PORT, () => {
  console.log('http://localhost:' + PORT)
})

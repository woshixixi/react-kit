const express = require('express')
// const path = require('path')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpack = require('webpack')

const devConfig = require('./webpack.dev')

const PORT = 3000

const app = express()
const compiler = webpack(devConfig)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: devConfig.output.publicPath
  })
)

// app.use(express.static(path.resolve(__dirname, '../dist')))

app.listen(PORT, () => {
  console.log('http://localhost:' + PORT)
})

const path = require('path')
const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack')

const devConfig = require('./dev')

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

// browserRouter all / url return index.html
app.use('*', (req, res, next) => {
  const filename = path.resolve(compiler.outputPath, 'index.html')
  compiler.outputFileSystem.readFile(filename, (err, result) => {
    if (err) {
      return next(err)
    }
    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })
})

app.listen(PORT, () => {
  console.log('http://localhost:' + PORT)
})

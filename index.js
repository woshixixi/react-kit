import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import App from './src'

function main() {
  ReactDOM.render(<App />, document.getElementById('root'))
}

main()

if (module.hot) {
  module.hot.accept()
}

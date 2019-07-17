import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './src/router'

function main() {
  ReactDOM.render(<AppRouter />, document.getElementById('root'))
}

main()

if (module.hot) {
  module.hot.accept()
}

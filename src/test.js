import React, { Component } from 'react'
import TestChild from './testChild'
export default class Test extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  render() {
    console.log('test render')
    return (
      <div>
        Test22 Page
        <TestChild />
      </div>
    )
  }
}

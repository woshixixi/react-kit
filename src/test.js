import React, { Component } from 'react'
import TestChild from './testChild'
import Resource from '../resource'
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
        <img src={Resource.get('test')} />
      </div>
    )
  }
}

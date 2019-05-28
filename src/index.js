import React, { Component } from 'react'
import Test from './test'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { liked: false }
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ liked: true })}>like</button>
        {this.state.liked && <p>like is clicked</p>}
        <Test />
      </div>
    )
  }
}

import React, { Component } from 'react'
import Test from './test'
// import './app.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { liked: false }
  }

  render() {
    return (
      <div>
        <button className="btn" onClick={() => this.setState({ liked: true })}>
          like
        </button>
        {this.state.liked && <p>like is clicked</p>}
        <Test />
      </div>
    )
  }
}

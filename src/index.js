import React, { Component } from 'react'
import Test from './test'
import Parent from './parent'
// import './app.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  state = { liked: false, name: 'parent1' }

  onClickLike = () => {
    const oldLike = this.state.liked
    this.setState({ liked: !oldLike })
  }

  render() {
    return (
      <div>
        <button className="btn" onClick={this.onClickLike}>
          like
        </button>
        <button
          className="btn"
          onClick={() => this.setState({ name: 'parent250' })}>
          change name
        </button>
        {this.state.liked && <p>like is clicked</p>}
        <Test />
        {this.state.liked ? <Parent name={this.state.name} /> : null}
      </div>
    )
  }
}

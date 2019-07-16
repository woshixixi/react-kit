import React, { Component } from 'react'
import Test from './test'
import Parent from './parent'
import PersonInput from './PersonInput'
import { ThemContext } from './context'

import './app.css'

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  state = { liked: false, name: 'parent1', them: 'them001' }

  onClickLike = () => {
    const oldLike = this.state.liked
    this.setState({ liked: !oldLike })
  }

  changeThem = them => {
    console.log('parent change them:', them)
    this.setState({ them: them })
  }

  render() {
    return (
      <ThemContext.Provider
        value={{ them: this.state.them, changeThem: this.changeThem }}>
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
        <PersonInput />
      </ThemContext.Provider>
    )
  }
}

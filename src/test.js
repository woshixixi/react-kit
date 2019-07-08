import React, { Component } from 'react'

export default class Test extends React.Component {
  render() {
    return <div>Test22 Page</div>
  }
}

function ToolBar() {
  return <div> toolboar</div>
}

class Button extends React.Component {
  render() {
    return (
      <div>
        button
        <ToolBar />
      </div>
    )
  }
}

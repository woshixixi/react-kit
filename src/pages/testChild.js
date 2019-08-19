import * as React from 'react'
import { ThemContext } from '../context'

class TestChild extends React.Component {
  changeThem = () => {
    this.context.changeThem('bbb')
  }

  render() {
    const ctx = this.context

    console.log('ctxbtn', ctx, 'props', this.props)

    return (
      <div>
        TestChild Page
        <button onClick={this.changeThem}>change them</button>
      </div>
    )
  }
}

TestChild.contextType = ThemContext
export default TestChild

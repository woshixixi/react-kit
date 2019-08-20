import * as React from 'react'

export default class Email extends React.PureComponent<any, any> {
  render() {
    console.log('render email')
    return (
      <div>
        <div> email class:{this.props.email}</div>
        <button onClick={() => this.props.change('new email')}>
          change email
        </button>
      </div>
    )
  }
}

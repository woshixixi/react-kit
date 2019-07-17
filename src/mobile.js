import * as React from 'react'

export default class Mobile extends React.PureComponent {
  render() {
    console.log('render mobile')
    return (
      <div>
        <div> mobile class:{this.props.mobile}</div>
        <button onClick={() => this.props.change('new mobile')}>
          change mobile
        </button>
      </div>
    )
  }
}

import * as React from 'react'
import Boy from './boy'

export default class Parent extends React.Component<any, any> {
  constructor(props) {
    super(props)
    console.log('parent...constructore')
  }

  state = {
    like: false,
    changed: false,
    boyName: {
      names: ['aaa']
    }
  }

  static getDerivedStateFromProps(props, state) {
    console.log('parent ..getDerivedState from props')
    return {
      like: true
    }
  }

  componentDidMount() {
    console.log('parent componentDidMount')
  }

  shouldComponentUpdate() {
    console.log('parent shouldComponentUpdate')
    return true
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('parent getSnapshotBeforeUpdate', prevProps, prevState)
    return null
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('parent componentDidUpdate', prevProps, prevState, snapshot)
  }

  componentWillUnmount() {
    console.log('parent componentWillUnmount')
  }

  // componentWillMount() {
  //   console.log('parent componentwillMount')
  // }

  onAddName = () => {
    this.setState({
      bodyName: {
        names: ['aaa', 'bbb']
      }
    })
  }

  render() {
    console.log('parent render', this.state.boyName)
    return (
      <div>
        parent name:{this.props.name}
        <Boy name={this.state.boyName} />
        {this.state.like ? 'like this compoent' : 'not like'}
        {this.state.changed ? 'changed state' : 'not changed'}
        <button
          className="btn"
          onClick={() => this.setState({ changed: true })}>
          change state
        </button>
        <button className="btn" onClick={this.onAddName}>
          change boy name
        </button>
      </div>
    )
  }
}

import * as React from 'react'

export default class Boy extends React.PureComponent {
  constructor(props) {
    super(props)
    console.log('boy consturctor ')
  }

  componentDidMount() {
    console.log('body componentdidmount')
  }

  componentWillUnmount() {
    console.log('body componentWillUnmount')
  }

  render() {
    console.log('boy render')
    return <div>boy</div>
  }
}

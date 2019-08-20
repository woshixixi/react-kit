import * as React from 'react'

export default class Boy extends React.PureComponent<any, any> {
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
    const { name } = this.props
    console.log('boy render', name)
    const l = name.names.length
    const lI = name.names[l - 1]

    return <div>boy:{lI}</div>
  }
}

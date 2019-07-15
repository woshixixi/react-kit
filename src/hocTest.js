import * as React from 'react'

export default (HocTest = testComponent =>
  class extends React.Component {
    render() {
      return (
        <div>
          <p>hoc</p>
          <testComponent />
        </div>
      )
    }
  })

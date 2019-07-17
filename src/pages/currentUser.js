import * as React from 'react'
import Email from './email'
import Mobile from './mobile'

export default class CurrentUser extends React.Component {
  state = {
    email: 'aaa',
    mobile: 'bbb'
  }

  changeEmail = email => {
    this.setState({ email })
  }

  changeMobile = mobile => {
    this.setState({ mobile })
  }

  render() {
    return (
      <div>
        <div>
          email:
          <Email
            email={this.state.email}
            change={email => {
              this.setState({ email })
            }}
          />
        </div>
        <div>
          mobile:
          <Mobile mobile={this.state.mobile} change={this.changeMobile} />
        </div>
      </div>
    )
  }
}

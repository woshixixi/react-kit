import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from './app'
import CurrentUser from './pages/currentUser'
import PersonInput from './pages/PersonInput'

export default class AppRouter extends React.Component<any, any> {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/current" component={CurrentUser} />
          <Route exact path="/input" component={PersonInput} />
        </Switch>
      </BrowserRouter>
    )
  }
}

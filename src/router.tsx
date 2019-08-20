import * as React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'

const PAGES = [
  {
    component: () => import('./app'),
    path: '/'
  },
  {
    component: () => import('./pages/currentUser'),
    path: '/current'
  },
  {
    component: () => import('./pages/PersonInput'),
    path: '/input'
  }
]

const Loading = ({ error }) => {
  if (error) {
    throw error
  }

  return <div>loading</div>
}

export default class AppRouter extends React.Component<any, any> {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          {PAGES.map(p => (
            <Route
              exact
              path={p.path}
              key={p.path}
              component={Loadable({
                loader: p.component,
                loading: Loading
              })}
            />
          ))}
        </Switch>
      </BrowserRouter>
    )
  }
}

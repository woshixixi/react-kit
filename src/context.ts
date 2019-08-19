import * as React from 'react'

export const ThemContext = React.createContext({
  them: 'defaultThem',
  changeThem: () => {}
})

import React, { Component } from 'react'

export const ThemContext = React.createContext({
  them: 'defaultThem',
  changeThem: () => {}
})

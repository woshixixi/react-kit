import * as React from 'react'

const throttle1 = (fn, wait) => {
  let previous = 0
  return function(...arg) {
    let now = Date.now()
    if (now - previous > wait) {
      previous = now
      fn.call(this, arg)
    }
  }
}

const throttle2 = (fn, wait) => {
  let timer
  return function(...arg) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.call(this, arg)
        timer = null
      }, wait)
    }
  }
}

const debounce = (fn, wait) => {
  let timer
  return function(...arg) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.call(this, arg)
    }, wait)
  }
}

export default class PersonInput extends React.Component {
  inputChange = value => {
    console.log('...change', value)
  }

  throttleChange1 = throttle1(this.inputChange, 1000)
  throttleChange2 = throttle2(this.inputChange, 1000)
  debounceChange = debounce(this.inputChange, 1000)

  render() {
    return [
      <div key="1">
        普通：
        <input onChange={e => this.inputChange(e.target.value)} />
      </div>,
      <div key="2">
        节流1：
        <input onChange={e => this.throttleChange1(e.target.value)} />
      </div>,
      <div key="3">
        节流2:
        <input onChange={e => this.throttleChange2(e.target.value)} />
      </div>,
      <div key="4">
        防抖:
        <input onChange={e => this.debounceChange(e.target.value)} />
      </div>
    ]
  }
}

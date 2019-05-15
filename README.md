# Build kit step by step

- [ ] add webpack

  - [x] add babel-loader
  - [x] add source map
  - [ ] add style css image support
  - [ ] add html-webpack-plugin
  - [ ] build clear dist
  - [ ] hot-load
  - [x] add prod
  - [ ] code split (chunk)
  - [ ] TypeScript

- [x] add react
- [ ] add router
- [ ] add ts
- [ ] add antd
- [ ] add redux
- [ ] add mobx

1.  add react `yarn add react`
2.  add react.development.js in html

3.  add `webpack` `webpack-cli`
4.  add webpack.dev.js as config
5.  add `react-dom` for react-dom.render

6.  add `babel` for jsx&es6 support:
    `yarn add @babel/core @babel/preset-env @babel/preset-react`
    use `babel-loader` of webpack

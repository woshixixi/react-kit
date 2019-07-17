# Build Kit Step By Step

## Support:

- [ ] add webpack

  - [x] add babel-loader
  - [x] add source map
  - [x] add style css image support
  - [x] add `html-webpack-plugin`
  - [x] add `webpack-dev-middleware`
  - [x] build clear dist
  - [x] hot-load
    - [x] add `webpack-hot-middleware`
  - [x] add prod
  - [x] code split (chunk)
    - [ ] add lazy load:`react-loadable`
  - [ ] TypeScript
  - [ ] prettier

- [x] add react
- [x] add router
- [ ] add ts
- [ ] add antd
- [ ] add redux
- [ ] add mobx

## Steps:

1.  add react `yarn add react`
2.  add react.development.js in html

3.  add `webpack` `webpack-cli`
4.  add webpack.dev.js as config
5.  add `react-dom` for react-dom.render

6.  add `babel` for jsx&es6 support:

    1. `yarn add @babel/core @babel/preset-env @babel/preset-react`
    2. use `babel-loader` of webpack

7.  add `webpack-hot-middleware`:

    1. `yarn add webpack-hot-middleware`
    2. webpack.HotModuleReplacementPlugin
    3. if(module.hot)...
    4. entry file add: webpack-hot-middleware/client

8.  browserRouter & hashRouter

import { hot } from 'react-hot-loader/root'
import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './App.less'

// import Home from './pages/Home'

const App = () => (
  <div styleName="root">
    <div className="position-center">This is App!</div>
  </div>
)
export default hot(CSSModules(App, styles))

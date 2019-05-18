import React from 'react'
import { hot } from 'react-hot-loader/root'
import CSSModules from 'react-css-modules'
import styles from './App.less'

const App = () => <div styleName="root">Hello world hello!</div>

export default hot(CSSModules(App, styles))

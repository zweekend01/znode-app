import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.less'

const Home = () => <div styleName="root">This is Home!</div>

export default CSSModules(Home, styles)

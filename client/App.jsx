import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { Spin } from 'antd'
import styles from './App.less'
import Home from './pages/Home'

class App extends Component {
  state = {
    loading: false,
    loadingText: ''
  }

  componentDidMount () {
    // 设置全局的EventBus,挂载在window上
    const EventEmitter = require('eventemitter3') // eslint-disable-line
    window.eventEmitter = new EventEmitter()
    window.eventEmitter.on('startLoading', this.onStartLoading)
    window.eventEmitter.on('stopLoading', this.onStopLoading)
  }

  componentWillUnmount () {
    window.eventEmitter = null
  }

  onStartLoading = (loadingText) => {
    this.setState({ loadingText, loading: true })
  }

  onStopLoading = () => {
    this.setState({ loading: false, loadingText: '' })
  }

  render () {
    const { loading, loadingText } = this.state

    return (
      <div>
        <Spin spinning={loading} tip={loadingText}>
          <Home />
        </Spin>
      </div>
    )
  }
}
export default hot(CSSModules(App, styles))

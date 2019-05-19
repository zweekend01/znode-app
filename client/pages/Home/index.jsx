import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import { Button } from 'antd'

import styles from './index.less'
import request from '../../config/http'

class Home extends Component {
  state = {
    name: 'This is Home!'
  }

  onRequest = async () => {
    const data = await request({ url: '/api' })
    console.log(data)
  }

  render () {
    const { name } = this.state

    return (
      <div>
        <h1>{name}</h1>
        <Button type="primary" onClick={this.onRequest}>发起请求</Button>
      </div>
    )
  }
}

export default CSSModules(Home, styles)
